import { Message } from 'discord.js';
import { CommandoClient } from 'discord.js-commando';

import { zoneChannels } from '../../config/config.json';

export const handleBotCheckMessage = (message: Message, client: CommandoClient) => {
  if (message.webhookID || message.author == client.user || message.author.bot) {
    for (const embed of message.embeds) {
      if (
        embed.title === `-wolfram <query>` &&
        (message.channel.id === zoneChannels.dj || message.channel.id === zoneChannels.vcDiscussion)
      ) {
        message.delete();
      }
    }
  }
};
