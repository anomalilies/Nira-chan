import { MessageEmbed } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';

import { allowLists, emojis, roles } from '../../config/config.json';

interface PromptArgs {
  text: string;
}

export default class DearMrFCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'dearmrf',
      aliases: ['write'],
      group: 'fun',
      memberName: 'dearmrf',
      description: 'Write your own personal letter to Mr. F.',
      args: [
        {
          key: 'text',
          prompt: 'What would you like to write?',
          type: 'string',
        },
      ],
    });
  }

  async run(message: CommandoMessage, { text }: PromptArgs) {
    if (
      message.channel.type === 'dm' ||
      allowLists.botSpamChannel.includes(message.channel.id) ||
      message.member.roles.cache.get(roles.botPass)
    ) {
      const embed = new MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        .addFields(
          {
            name: 'Dear Mr. F:',
            value: text,
          },
          {
            name: 'Your Response:',
            value:
              `Mr. F, I have no idea what **${message.author}** is saying, but something ` +
              `tells me you best pay really close attention! ${emojis.wince}`,
          },
        )
        .setColor(15849719);

      return await message.channel.send(embed);
    }
  }
}
