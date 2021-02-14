import { MessageEmbed } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';

import { allowlists, emojis, zoneRoles } from '../../config/config.json';

export default class DespairCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'despair',
      group: 'fun',
      memberName: 'despair',
      description: 'Express Despair the Nira Way™️.',
    });
  }

  async run(message: CommandoMessage) {
    if (
      message.channel.type === 'dm' ||
      allowlists.botspamchannels.includes(message.channel.id) ||
      message.member.roles.cache.get(zoneRoles.botPass)
    ) {
      const embed = new MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`Aaaa, the tape is rewinding so fast! ${emojis.despair}`)
        .setColor(15849719);

      return await message.channel.send(embed);
    }
  }
}
