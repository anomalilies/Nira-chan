import { Message, MessageEmbed, TextChannel } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';

import { members, colour } from '../../config/config.json';

interface PromptArgs {
  id: string;
  channelID: string;
  title: string;
  desc: string;
  fieldTitle: string;
}

export default class EmbedCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'embed',
      aliases: ['editembed'],
      group: 'dev',
      memberName: 'embed',
      description: "Edit one of Nira-chan's messages with an embed!",
      args: [
        {
          key: 'id',
          prompt: 'What is the ID of the message would you like to edit?',
          type: 'string',
        },
        {
          key: 'channelID',
          prompt: "What channel is your target message in? If you're unsure, respond with `N/A`.",
          type: 'string',
        },
        {
          key: 'title',
          prompt: 'What would you like the title of the embed to be?',
          type: 'string',
        },
        {
          key: 'desc',
          prompt: 'What would you like the description of the embed to be?',
          type: 'string',
        },
        {
          key: 'fieldTitle',
          prompt: "If you'd like to add a field, what would you like the title to be? If not, respond with `N/A`.",
          type: 'string',
        },
      ],
      ownerOnly: true,
      guildOnly: true,
    });
  }

  async run(message: CommandoMessage, { id, channelID, title, desc, fieldTitle }: PromptArgs) {
    const failure = `<@${message.author.id}>, Cancelled command.`;

    if (id.match(/^\d{18}$/)) {
      let targetMsg: Message;

      if (channelID.toUpperCase() === 'N/A') {
        const channels = message.guild.channels.cache
          .filter((c) => c.type === 'text')
          .map((channel) => <TextChannel>channel);

        for (const index of channels) {
          targetMsg = await index.messages.fetch(id);
        }
      } else {
        const channel = channelID.split(/(\d+)/);
        if (channel[1].match(/^\d{18}$/)) {
          const targetChannel = <TextChannel>message.guild.channels.cache.get(channel[1]);
          targetMsg = await targetChannel.messages.fetch(id);
        }
      }

      const embed = new MessageEmbed({ color: colour, title, description: desc });

      if (
        fieldTitle.toUpperCase() !== 'N/A' &&
        targetMsg.id.match(/^\d{18}$/) &&
        targetMsg.author.id === members.niraChan
      ) {
        await message.channel.send(
          `<@${message.author.id}>, What would you like this field to contain?` +
            '\nRespond with `cancel` to cancel the command. The command will automatically be cancelled in 30 seconds.',
        );
        const filter = (m: Message) => m.author.id === message.author.id;
        const collected = await message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] });
        const fieldValue = collected.first().content;

        if (fieldValue.toLowerCase() !== 'cancel') {
          embed.addFields({ name: fieldTitle, value: fieldValue });
          await targetMsg.edit('', embed);
        } else {
          await message.channel.send(failure);
        }
      } else {
        await targetMsg.edit('', embed);
      }
    } else {
      await message.channel.send(failure);
    }

    return message;
  }
}
