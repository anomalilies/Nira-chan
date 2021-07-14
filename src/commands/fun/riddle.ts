import { MessageEmbed } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';

import riddles from '../../data/riddles.json';
import { doesUserHaveBotpass, isBotspamChannel, isDmChannel } from '../../util/checks';
import { colour } from '../../config/config.json';

export default class RiddleCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'riddle',
      group: 'fun',
      memberName: 'riddle',
      description: 'Just really awful riddles.',
    });
  }

  async run(message: CommandoMessage) {
    if (isDmChannel(message) || isBotspamChannel(message) || doesUserHaveBotpass(message)) {
      const i = Math.floor(Math.random() * riddles.length);

      const embed = new MessageEmbed({
        author: { name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) },
        color: colour,
        description: riddles[i].riddle,
        fields: [{ name: 'Answer', value: `||${riddles[i].answer}||` }],
      });

      return await message.channel.send(embed);
    }
  }
}
