import { Message } from 'discord.js';
import { CommandoClient } from 'discord.js-commando';

import {
  handleCountingMessage,
  handleDeathOfNira,
  handleNiraWave,
  handleNoUMessage,
  handlePaladinMessage,
  handlePoyoMessage,
  handleTwoWordStoryMessage,
  handleWorkInUniguriMessage,
  handleCheckNiraMojis,
  handlePatPatRole,
  handleNiraMojisInChannels,
  handleUwuChannelMessage,
  handleBotCheckMessage,
  handleGreyMessage,
  handleWelcomeMessage,
  handleSubscriptionThankYouMessage,
  handlePatPatCommandMessage,
  handleNonNitroEmoji,
  handleServerRulesMessage,
  handleFishyCommandsMessage,
  handleQueenCommandMessage,
} from '../handler';

export default async function (client: CommandoClient, message: Message) {
  handleWelcomeMessage(message, client);

  handleSubscriptionThankYouMessage(message);

  await handleCountingMessage(message);

  handleGreyMessage(message);

  handleBotCheckMessage(message, client);

  handleUwuChannelMessage(message);

  handleNiraMojisInChannels(message);

  handleCheckNiraMojis(message);

  handlePatPatRole(message);

  handleNiraWave(message, client);

  await handleNonNitroEmoji(message, client);

  await handlePatPatCommandMessage(message, client.commandPrefix);

  handleFishyCommandsMessage(message, client.commandPrefix);

  handleWorkInUniguriMessage(message);

  handleTwoWordStoryMessage(message);

  handleDeathOfNira(message);

  handlePoyoMessage(message);

  await handlePaladinMessage(message);

  handleNoUMessage(message);

  handleQueenCommandMessage(message);

  await handleServerRulesMessage(message, client.commandPrefix);
}
