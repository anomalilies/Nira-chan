import { TextChannel } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';

import { members } from '../../config/config.json';

interface PromptArgs {
  id: string;
  channelID: string;
}

export default class RemoveCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'remove',
      group: 'dev',
      memberName: 'remove',
      description: "Remove one of Nira-chan's messages!",
      args: [
        {
          key: 'channelID',
          prompt: 'What channel is your target message in?',
          type: 'string',
        },
        {
          key: 'id',
          prompt: 'What is the ID of the message would you like to remove?',
          type: 'string',
        },
      ],
      ownerOnly: true,
      guildOnly: true,
    });
  }

  async run(message: CommandoMessage, { id, channelID }: PromptArgs) {
    if (process.env.NODE_ENV !== 'development') {
      return message.say('This commands works only in development.');
    }

    try {
      const channel = <TextChannel>await this.client.channels.fetch(channelID);
      const msg = await channel.messages.fetch(id);

      if (msg.author.id === members.niraChan) {
        msg.delete();
      }
    } catch (err) {
      console.log(err);
    }

    return message;
  }
}
