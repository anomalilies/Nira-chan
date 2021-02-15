import { MessageEmbed } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';

import { emojis } from '../../config/config.json';
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
      const embed = new MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`Aaaa, the tape is rewinding so fast! ${emojis.despair}`)
        .setColor(15849719);

      return await message.channel.send(embed);
    }
  }
}
