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

export default async function (client: CommandoClient, oldMessage: CommandoMessage, newMessage: CommandoMessage) {
  if (newMessage.content === oldMessage.content) {
    return;
  }

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
