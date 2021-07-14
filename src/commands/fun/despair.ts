import { MessageEmbed } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';

import { emojis, colour } from '../../config/config.json';
import { doesUserHaveBotpass, isBotspamChannel, isDmChannel } from '../../util/checks';

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
    if (isDmChannel(message) || isBotspamChannel(message) || doesUserHaveBotpass(message)) {
      const embed = new MessageEmbed({
        author: { name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) },
        description: `Aaaa, the tape is rewinding so fast! ${emojis.despair}`,
        color: colour,
      });

      return await message.channel.send(embed);
    }
  }
}
