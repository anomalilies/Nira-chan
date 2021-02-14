import { Message, MessageEmbed } from 'discord.js';
import { CommandoClient } from 'discord.js-commando';

import { members } from '../config/config.json';

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
} from '../handler';

export default async function (client: CommandoClient, message: Message) {
  handleWelcomeMessage(message, client);

  handleSubscriptionThankYouMessage(message);

  await handleCountingMessage(message);

  handleGreyMessage(message);

  handleBotCheckMessage(message, client);

  await handleUwuChannelMessage(message);

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

  handlePoyoMessage(message);

  await handlePaladinMessage(message);

  handleNoUMessage(message);

  // TODO move this over to commands
  // The Queen
  if (message.content.toLowerCase() === client.commandPrefix + 'wk zutomayo') {
    const embed = new MessageEmbed()
      .setColor(15849719)
      .setTitle('Did you know?')
      .setDescription(`In reality, <@${members.currentowner}> has the crown. <:queen:762902044683403272>`);
    message.channel.send(embed);
  }

  await handleServerRulesMessage(message, client.commandPrefix);
}
