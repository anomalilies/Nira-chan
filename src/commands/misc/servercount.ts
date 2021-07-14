import { MessageEmbed } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';

import { colour } from '../../config/config.json';

export default class ServerCountCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'servers',
      aliases: ['servercount'],
      group: 'misc',
      memberName: 'servercount',
      description: 'Check how many servers Nira is in!',
    });
  }

  async run(message: CommandoMessage) {
    const embed = new MessageEmbed({
      author: { name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) },
      description: `<@!${this.client.user.id}> is currently in **__${this.client.guilds.cache.size} servers__**!`,
      color: colour,
    });

    return await message.channel.send(embed.setTimestamp());
  }
}
