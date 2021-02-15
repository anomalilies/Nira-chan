import { MessageEmbed } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';

import { allowlists, roles, emojis } from '../../config/config.json';

export default class StabStabStabCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'stabstabstab',
      aliases: ['stab', 'fence', 'fencing'],
      group: 'fun',
      memberName: 'stabstabstab',
      description: 'Go fencing.',
    });
  }

  async run(message: CommandoMessage) {
    if (
      message.channel.type === 'dm' ||
      allowlists.botspamchannels.includes(message.channel.id) ||
      message.member.roles.cache.get(roles.botPass)
    ) {
      const stabstabstab = new MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        .setColor(15849719)
        .setDescription(`pokepokepoke ${emojis.fencing}`);

      return await message.channel.send(stabstabstab);
    }
  }
}
