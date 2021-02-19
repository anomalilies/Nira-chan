import { stripIndents, oneLine } from 'common-tags';
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
      examples: ['help'],
      guarded: true,
    });
  }

  async run(msg: CommandoMessage) {
    const groups = this.client.registry.groups;
    const showAll = true;

    const embed = new MessageEmbed({
      color: '#F1D8F7',
      description: stripIndents`
        ${oneLine`
          To run a command in ${msg.guild ? msg.guild.name : 'any server'},
          use ${Command.usage('command', msg.guild ? msg.guild.commandPrefix : null, this.client.user)}.
          For example, ${Command.usage('prefix', msg.guild ? msg.guild.commandPrefix : null, this.client.user)}.
        `}
        To run a command in this DM, simply use ${Command.usage('command', null, null)} with no prefix.

        Use ${this.usage('<command>', null, null)} to view detailed information about a specific command.
        Use ${this.usage('all', null, null)} to view a list of *all* commands, not just available ones.

        __**${showAll ? 'All commands' : `Available commands in ${msg.guild || 'this DM'}`}**__

        ${groups
          .filter((grp) => grp.commands.some((cmd) => !cmd.hidden && (showAll || cmd.isUsable(msg))))
          .map(
            (grp) => stripIndents`
            __${grp.name}__
            ${grp.commands
              .filter((cmd) => !cmd.hidden && (showAll || cmd.isUsable(msg)))
              .map((cmd) => `**${cmd.name}:** ${cmd.description}${cmd.nsfw ? ' (NSFW)' : ''}`)
              .join('\n')}
            `,
          )
          .join('\n\n')}
      `,
    });

    return msg.say(embed);
  }
}
