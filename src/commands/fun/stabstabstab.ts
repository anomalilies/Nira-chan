import { MessageEmbed } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';

import { emojis, colour } from '../../config/config.json';
import { doesUserHaveBotpass, isBotspamChannel, isDmChannel } from '../../util/checks';

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
    if (isDmChannel(message) || isBotspamChannel(message) || doesUserHaveBotpass(message)) {
      const stabstabstab = new MessageEmbed({
        author: { name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) },
        color: colour,
        description: `pokepokepoke ${emojis.fencing}`,
      });

      return await message.channel.send(stabstabstab);
    }
  }
}
