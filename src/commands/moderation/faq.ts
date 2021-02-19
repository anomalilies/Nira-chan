import { MessageEmbed, TextChannel } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';

import { emojis, allChannels } from '../../config/config.json';
import { isHomeGuild } from '../../util/checks';

interface PromptArgs {
  title: string;
  description: string;
}

export default class FAQCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'faq',
      group: 'moderation',
      memberName: 'faq',
      description: 'Create a FAQ embed.',
      args: [
        {
          key: 'title',
          prompt: 'What would you like the title to be?',
          type: 'string',
        },
        {
          key: 'description',
          prompt: 'What would you like the description to be?',
          type: 'string',
        },
      ],
      ownerOnly: true,
      guildOnly: true,
    });
  }

  async run(message: CommandoMessage, { title, description }: PromptArgs) {
    if (isHomeGuild(message)) {
      const embed = new MessageEmbed({ title, description, color: '#F1D8F7' });

      const channel = <TextChannel>await this.client.channels.fetch(allChannels.faq);
      await channel.send(embed);
      await channel.send(emojis.spacer);
    }

    return message;
  }
}
