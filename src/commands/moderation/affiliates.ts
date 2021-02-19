import { MessageEmbed, TextChannel } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';

import { homeGuild, emojis, allChannels } from '../../config/config.json';

interface PromptArgs {
  title: string;
  description: string;
  link: string;
}

export default class AffiliatesCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'affiliate',
      group: 'moderation',
      memberName: 'affiliate',
      description: 'Embed an affiliates link.',
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
        {
          key: 'link',
          prompt: 'Paste the link here!',
          type: 'string',
        },
      ],
      ownerOnly: true,
      guildOnly: true,
    });
  }

  async run(message: CommandoMessage, { title, description, link }: PromptArgs) {
    if (message.guild.id === homeGuild) {
      const embed = new MessageEmbed().setTitle(title).setDescription(description).setColor('#F1D8F7');

      const channel = <TextChannel>await this.client.channels.fetch(allChannels.affiliates);

      await channel.send(embed);
      await channel.send(link);
      await channel.send(emojis.spacer);

      return await message.channel.send('Successfully created embed!');
    }
  }
}
