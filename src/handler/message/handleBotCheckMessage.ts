import { CommandoClient, CommandoMessage } from 'discord.js-commando';

import { allChannels } from '../../config/config.json';
import { botCheckMessage } from '../../config/event_handler.json';
import { keyv } from '../../database/keyv';
import { isInChannel } from '../../util/checks';

export const handleBotCheckMessage = async (message: CommandoMessage, client: CommandoClient) => {
  if ((await keyv.get(Object.keys({ botCheckMessage })[0])) === false) {
    return;
  }

  if (message.webhookID || message.author == client.user || message.author.bot) {
    for (const embed of message.embeds) {
      if (
        embed.title === `-wolfram <query>` &&
        (isInChannel(message, allChannels.dj) || isInChannel(message, allChannels.vcDiscussion))
      ) {
        message.delete();
      }
    }
  }
};
