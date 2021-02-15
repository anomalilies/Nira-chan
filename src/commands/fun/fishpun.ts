import { MessageEmbed } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';

import { doesUserHaveBotpass, isBotspamChannel, isDmChannel, isHomeGuild, isInChannel } from '../../util/checks';
import { allChannels } from '../../config/config.json';
import fishpuns from '../../data/fishpuns.json';

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
      isDmChannel(message) ||
      isBotspamChannel(message) ||
      isInChannel(message, allChannels.fishy) ||
      !isHomeGuild(message) ||
      doesUserHaveBotpass(message)
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
