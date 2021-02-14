import { Message } from 'discord.js';
import { CommandoClient } from 'discord.js-commando';

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

export default async function (client: CommandoClient, oldMessage: Message, newMessage: Message) {
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
