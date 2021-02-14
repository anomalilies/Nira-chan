import { Message, TextChannel } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';

import { members } from '../../config/config.json';

interface PromptArgs {
  id: string;
  channelID: string;
}

export default class EditCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'edit',
      group: 'misc',
      memberName: 'edit',
      description: "Edit one of Nira-chan's messages!",
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
      ],
      ownerOnly: true,
      guildOnly: true,
    });
  }

  async run(message: CommandoMessage, { id, channelID }: PromptArgs) {
    const failure = `<@${message.author.id}>, Cancelled command.`;

    if (id.match(/^\d{18}$/)) {
      let targetMsg: Message;

      if (channelID.toUpperCase() === 'N/A') {
        const channels = message.guild.channels.cache.filter((c) => c.type === 'text').map((c) => <TextChannel>c);
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

      if (targetMsg.id.match(/^\d{18}$/) && targetMsg.author.id === members.nirachanactual) {
        await message.channel.send(
          `<@${message.author.id}>, What would you like the new message to say?` +
            '\nRespond with `cancel` to cancel the command. The command will automatically be cancelled in 30 seconds.',
        );
        const filter = (m: Message) => m.author.id === message.author.id;

        const collected = await message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] });
        const text = collected.first().content;

        if (text.toLowerCase() !== 'cancel') {
          await targetMsg.edit(text);
        } else {
          await message.channel.send(`<@${message.author.id}>, Cancelled command.`);
        }
      } else {
        await message.channel.send(failure);
      }
    } else {
      await message.channel.send(failure);
    }

    return message;
  }
}
