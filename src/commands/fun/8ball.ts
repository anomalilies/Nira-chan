import { MessageEmbed } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';

import { doesUserHaveBotpass, isBotspamChannel, isDmChannel, isHomeGuild } from '../../util/checks';
import responses from '../../data/8ball.json';

export default class EightBallCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: '8ball',
      aliases: ['eightball', 'eight ball', '8 ball', '8-ball', 'eight-ball'],
      group: 'fun',
      memberName: '8ball',
      description: 'Ask the magic 8-Ball!',
      args: [
        {
          key: 'query',
          prompt: 'What would you like to ask?',
          type: 'string',
        },
      ],
    });
  }

  async run(message: CommandoMessage, query: string) {
    if (isDmChannel(message) || isBotspamChannel(message) || !isHomeGuild(message) || doesUserHaveBotpass(message)) {
      let nickname = message.author.username;
      if (!isDmChannel(message)) {
        nickname = message.member.displayName;
      }

      const embed = new MessageEmbed({
        description: `> **${Object.values(query)}?**\n\nThe magic 8-Ball responds: "**${
          responses[Math.floor(Math.random() * responses.length)]
        }**" `,
        color: '#F1D8F7',
        author: { name: `${nickname} asked...`, iconURL: message.author.displayAvatarURL({ dynamic: true }) },
      });

      return await message.channel.send(embed);
    }
  }
}
