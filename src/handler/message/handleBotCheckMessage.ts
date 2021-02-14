import { Message } from 'discord.js';
import { CommandoClient } from 'discord.js-commando';

import { allChannels } from '../../config/config.json';

export const handleBotCheckMessage = (message: Message, client: CommandoClient) => {
  if (message.webhookID || message.author == client.user || message.author.bot) {
    for (const embed of message.embeds) {
      if (
        embed.title === `-wolfram <query>` &&
        (message.channel.id === allChannels.dj || message.channel.id === allChannels.vcDiscussion)
      ) {
        message.delete();
      }
    }
  }
};
