import { MessageEmbed, TextChannel } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';

import { homeguild, emojis, zoneChannels, members } from '../../config/config.json';

interface PromptArgs {
  title: string;
  description: string;
  check: string;
}

export default class SayCommand extends Command {
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
          validate: (check: string) => {
            const validArgs = ['n', 'no', 'y', 'yes'];
            if (validArgs.some((word) => check.toLowerCase() === word)) return true;
            return 'Incorrect syntax.';
          },
        },
      ],
      guildOnly: true,
    });
  }

  async run(message: CommandoMessage, { title, description, check }: PromptArgs) {
    if (message.guild.id === homeguild && check.toLowerCase()) {
      const embed = new MessageEmbed().setTitle(title).setDescription(description).setColor(15849719);

      if (check.toLowerCase() === ('n' || 'no')) {
        if (message.channel.id === '745410767574007811') {
          const channel = <TextChannel>message.guild.channels.cache.get('742069780328087613');

          await channel.send(embed);
          await message.channel.send('Successfully created embed!');
        } else if (message.author.id === members.currentowner) {
          const faqEmbed = new MessageEmbed().setTitle(title).setDescription(description).setColor(15849719);
          const channel = <TextChannel>message.guild.channels.cache.get('760621183564513312');

          await channel.send(faqEmbed);
          await channel.send(emojis.spacer);
          await message.channel.send('Successfully created embed!');
        } else {
          await message.channel.send('<:nirangy:777736569746227211>');
        }
        return message;
      }

      const user = await message.guild.members.fetch(members.currentowner);

      await user.send(embed);
      await message.channel.send(
        `Your link is currently being checked over by Lily, and will be added to <#${zoneChannels.links}> shortly!`,
      );
    }

    return message;
  }
}
