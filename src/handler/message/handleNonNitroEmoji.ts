import { GuildEmoji, TextChannel, User } from 'discord.js';
import { CommandoClient, CommandoMessage } from 'discord.js-commando';

import { allChannels } from '../../config/config.json';
import { nonNitroEmoji } from '../../config/event_handler.json';
import { keyv } from '../../database/keyv';

// Replace a regular message with a message sent through a webhook with the OP's name and avatar
async function replaceMessageThroughWebhook(message: CommandoMessage, resendContent: string) {
  if (message.channel.id === allChannels.counting) {
    return;
  }

  if (message.channel.type !== 'dm') {
    message.delete();
  }

  const webhooks = await (<TextChannel>message.channel).fetchWebhooks();
  const webhook = webhooks.filter((w) => (<User>w.owner).id === message.client.user.id).first();

  const member = message.guild.member(message.author);
  const nickname = member ? member.displayName : null;
  const avatar = message.author.displayAvatarURL();

  if (webhook === undefined) {
    try {
      // No webhook exists in this channel, so create one
      const newWebhook = await (<TextChannel>message.channel).createWebhook('Nira-chan');

      newWebhook.send(resendContent, {
        username: nickname,
        avatarURL: avatar,
      });
    } catch (error) {
      console.error(error);
    } finally {
      // eslint-disable-next-line no-unsafe-finally
      return;
    }
  }

  webhook.send(resendContent, {
    username: nickname,
    avatarURL: avatar,
  });
}

function findEmoji(client: CommandoClient, message: CommandoMessage, emojiName: string) {
  if (message.channel.type !== 'dm') {
    const sameEmoji = (emoji: GuildEmoji) => emoji.available && emoji.name.toLowerCase() === emojiName.toLowerCase();
    let match = message.guild.emojis.cache.find(sameEmoji);

    if (!match) {
      match = client.guilds.cache.flatMap((guild) => guild.emojis.cache).find(sameEmoji);
    }

    return match;
  }
}

// TODO: start rewrite this
// Check for non-nitro user using GIF emoji to resend it with the GIF emoji
// Capture group 1 will have the emoji name in this case
export const handleNonNitroEmoji = async (message: CommandoMessage, client: CommandoClient) => {
  if ((await keyv.get(Object.keys({ nonNitroEmoji })[0])) === false) {
    return;
  }

  if (!message.member || message.channel.id == allChannels.fishy) return;

  const emojiRegex = /<a?:\w+:\d+>|(?<!\\):(\w+):|^-(\w+)$/g;
  let needsToResend = false;

  const resendContent = message.content.replace(emojiRegex, (match: string, group1: string, group2: string) => {
    const emojiMatch = group1 || group2;
    if (emojiMatch) {
      const emoji = findEmoji(client, message, emojiMatch);
      if (emoji) {
        // We only need to resend if we replace any animated emoji
        needsToResend = needsToResend || emoji.animated || emoji.guild.id !== message.guild.id;
        return emoji.toString();
      }
    }
    return match;
  });

  if (needsToResend) {
    // If there were any GIF emoji added to the message
    await replaceMessageThroughWebhook(message, resendContent);
  }
};
