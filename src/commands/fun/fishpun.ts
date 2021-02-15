import { MessageEmbed } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import fishpuns from '../../data/fishpuns.json';

import { allowlists, homeguild, roles } from '../../config/config.json';

export default class FishpunCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'fishpun',
      aliases: ['fishypun', 'fishjoke', 'fishyjoke', 'squidpun', 'squiddypun', 'squidjoke', 'squiddyjoke'],
      group: 'fun',
      memberName: 'fishpun',
      description: 'Something seems... *Fishy*.',
    });
  }

  async run(message: CommandoMessage) {
    if (
      message.channel.type === 'dm' ||
      allowlists.botspamchannels.includes(message.channel.id) ||
      message.channel.id === '747201864889794721' ||
      message.guild.id !== homeguild ||
      message.member.roles.cache.get(roles.botPass)
    ) {
      const embed = new MessageEmbed()
        .setTitle('Mr. Fish says...')
        .setThumbnail('https://raw.githubusercontent.com/anomalilies/Nira-chan/master/Images/Fishy.jpg')
        .setDescription(fishpuns[Math.floor(Math.random() * fishpuns.length)])
        .setColor(15849719);

      return await message.channel.send(embed);
    }
  }
}
