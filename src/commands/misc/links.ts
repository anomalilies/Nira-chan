import { oneLine } from 'common-tags';
import { MessageEmbed, TextChannel } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';

import { emojis, allChannels, members } from '../../config/config.json';
import { isHomeGuild, isInChannel } from '../../util/checks';

const yesChoices = ['y', 'yes'];
const noChoices = ['n', 'no'];

interface PromptArgs {
  title: string;
  description: string;
  check: string;
}

export default class LinkCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'link',
      group: 'misc',
      memberName: 'link',
      description: 'Embed a link.',
      args: [
        {
          key: 'title',
          prompt: 'What would you like the title to be?',
          type: 'string',
        },
        {
          key: 'description',
          prompt: 'Paste the link here!',
          type: 'string',
        },
        {
          key: 'check',
          prompt: 'Is this link for a concert? (y/n)',
          type: 'string',
          oneOf: yesChoices.concat(noChoices),
        },
      ],
      guildOnly: true,
    });
  }

  async run(message: CommandoMessage, { title, description, check }: PromptArgs) {
    if (isHomeGuild(message)) {
      const embed = new MessageEmbed({ title, description, color: '#F1D8F7' });

      if (noChoices.includes(check)) {
        if (isInChannel(message, allChannels.addALink)) {
          const channel = <TextChannel>await this.client.channels.fetch(allChannels.links);

          await channel.send(embed);
          await message.channel.send('Successfully created embed!');
        } else if (message.author.id === members.currentOwner) {
          const channel = <TextChannel>await this.client.channels.fetch(allChannels.faq);

          await channel.send(embed);
          await channel.send(emojis.spacer);
          await message.channel.send('Successfully created embed!');
        } else {
          await message.channel.send(emojis.ngy);
        }
        return message;
      }

      const user = await message.guild.members.fetch(members.currentOwner);

      await user.send(embed);
      await message.channel.send(
        oneLine`
          Your link is currently being checked over by Lily, and will be added 
          to <#${allChannels.livesAndPerformances}> shortly!
        `,
      );
    }

    return message;
  }
}
