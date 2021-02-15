import { MessageEmbed, TextChannel } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';

import { homeguild, emojis, zoneChannels } from '../../config/config.json';

interface PromptArgs {
  title: string;
  description: string;
}

export default class FAQCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'faq',
      group: 'misc',
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
    if (message.guild.id === homeguild) {
      const embed = new MessageEmbed().setTitle(title).setDescription(description).setColor(15849719);

      const channel = <TextChannel>message.guild.channels.cache.get(zoneChannels.faq);
      await channel.send(embed);
      await channel.send(emojis.spacer);
    }

    return message;
  }
}
