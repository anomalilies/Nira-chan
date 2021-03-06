import { stripIndents } from 'common-tags';
import { MessageEmbed } from 'discord.js';

import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';

export default class HelpCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'help',
      group: 'misc',
      memberName: 'help',
      aliases: ['commands'],
      description: 'Displays a list of all commands',
      guarded: true,
    });
  }

  async run(msg: CommandoMessage) {
    const groups = this.client.registry.groups;
    const showAll = true;

    const embed = new MessageEmbed({
      color: '#F1D8F7',
      title: `${
        showAll ? `${this.client.user.username}'s Commands` : `Available commands in ${msg.guild || 'this DM'}`
      }`,
      description: stripIndents`
        ${groups
          .filter((grp) => grp.commands.some((cmd) => !cmd.hidden && (showAll || cmd.isUsable(msg))))
          .map(
            (grp) => stripIndents`
            **${grp.name}**
            ${grp.commands
              .filter((cmd) => !cmd.hidden && (showAll || cmd.isUsable(msg)))
              .map((cmd) => `\u0060${cmd.name}\u0060: ${cmd.description}`)
              .join('\n')}
            `,
          )
          .join('\n\n')}
      `,
    });

    return msg.say(embed);
  }
}
