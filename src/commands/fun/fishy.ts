import { MessageEmbed } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';

import { isDmChannel, isHomeGuild, isInChannel } from '../../util/checks';
import { allChannels } from '../../config/config.json';
import fishpuns from '../../data/fishpuns.json';

export default class FishyCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'fishy',
      aliases: ['fishy', 'fish', 'fihy', 'fisy', 'foshy', 'fisyh', 'fsihy', 'fin'],
      group: 'fun',
      memberName: 'fishy',
      description: 'Something seems... *Fishy*.',
    });
  }

  async run(message: CommandoMessage) {
    if (isDmChannel(message) || isInChannel(message, allChannels.fishy) || !isHomeGuild(message)) {
      const embed = new MessageEmbed({
        title: ``,
        description: ``, // "Caught only 1 fishy! 🎣"
        fields: [
          {
            name: 'Mr. Fish says...',
            value: `> ${fishpuns[Math.floor(Math.random() * fishpuns.length)]}`,
          },
        ],
        footer: {
          text: `${message.author.tag} has {x} fishy`,
          iconURL: message.author.displayAvatarURL({ dynamic: true }),
        },
        color: '#F1D8F7',
      });

      return await message.channel.send(embed.setTimestamp());
    }
  }
}
