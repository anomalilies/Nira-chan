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

  handleNiraMojisInChannels(newMessage);

  handleCheckNiraMojis(newMessage);

  handlePatPatRole(newMessage);

  handleNiraWave(newMessage, client);

  handleCountingEditedMessage(newMessage);

  handleTwoWordStoryMessage(newMessage);

  handleDeathOfNira(newMessage);

  handlePoyoMessage(newMessage);

  handlePaladinMessage(newMessage);

  handleNoUMessage(newMessage);
}
