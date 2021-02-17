import { CommandoClient, CommandoMessage } from 'discord.js-commando';

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
  handleOtherFishyMessage,
  handleQueenCommandMessage,
} from '../handler';

export default async function (client: CommandoClient, message: CommandoMessage) {
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

  handleOtherFishyMessage(message, client);

  handleWorkInUniguriMessage(message);

  handleTwoWordStoryMessage(message);

  handleDeathOfNira(message);

  await handlePoyoMessage(message);

  await handlePaladinMessage(message);

  handleNoUMessage(message);

  handleQueenCommandMessage(message);

  await handleServerRulesMessage(message, client.commandPrefix);
}
