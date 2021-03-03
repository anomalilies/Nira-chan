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
import { onMessage } from '../config/event_handler.json';
import { keyv } from '../database/keyv';

export default async function (client: CommandoClient, message: CommandoMessage) {
  if ((await keyv.get(Object.keys({ onMessage })[0])) === false) {
    return;
  }
  await handleWelcomeMessage(message, client);

  await handleSubscriptionThankYouMessage(message);

  await handleCountingMessage(message);

  await handleGreyMessage(message);

  await handleBotCheckMessage(message, client);

  await handleUwuChannelMessage(message);

  await handleNiraMojisInChannels(message);

  await handleCheckNiraMojis(message);

  await handlePatPatRole(message);

  await handleNiraWave(message, client);

  await handleNonNitroEmoji(message, client);

  await handlePatPatCommandMessage(message, client.commandPrefix);

  await handleFishyCommandsMessage(message, client.commandPrefix);

  await handleOtherFishyMessage(message, client);

  await handleWorkInUniguriMessage(message);

  await handleTwoWordStoryMessage(message);

  await handleDeathOfNira(message);

  await handlePoyoMessage(message);

  await handlePaladinMessage(message);

  await handleNoUMessage(message);

  await handleQueenCommandMessage(message);

  await handleServerRulesMessage(message, client.commandPrefix);
}
