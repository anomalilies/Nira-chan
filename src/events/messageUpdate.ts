import { CommandoClient, CommandoMessage } from 'discord.js-commando';

import {
  handleCountingEditedMessage,
  handleDeathOfNira,
  handleNiraWave,
  handleNoUMessage,
  handlePaladinMessage,
  handlePoyoMessage,
  handleCheckNiraMojis,
  handleNiraMessageReactions,
  handleNiraMojisInChannels,
  handlePatPatRole,
  handleTwoWordStoryMessage,
} from '../handler';
import { onMessageUpdate } from '../config/event_handler.json';
import { keyv } from '../database/keyv';

export default async function (client: CommandoClient, oldMessage: CommandoMessage, newMessage: CommandoMessage) {
  if ((await keyv.get(Object.keys({ onMessageUpdate })[0])) === false) {
    return;
  }

  if (
    newMessage.content === oldMessage.content ||
    newMessage.webhookID ||
    newMessage.author == client.user ||
    newMessage.author.bot
  ) {
    return;
  } else {
    await handleNiraMessageReactions(newMessage, client);

    await handleNiraMojisInChannels(newMessage);

    await handleCheckNiraMojis(newMessage);

    await handlePatPatRole(newMessage);

    await handleNiraWave(newMessage, client);

    await handleCountingEditedMessage(newMessage);

    await handleTwoWordStoryMessage(newMessage);

    await handleDeathOfNira(newMessage);

    await handlePoyoMessage(newMessage);

    await handlePaladinMessage(newMessage);

    await handleNoUMessage(newMessage);
  }
}
