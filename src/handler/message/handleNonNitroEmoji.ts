import { GuildEmoji, TextChannel, User } from 'discord.js';
import { CommandoClient, CommandoMessage } from 'discord.js-commando';

import { allChannels } from '../../config/config.json';
import { nonNitroEmoji } from '../../config/event_handler.json';
import { keyv } from '../../database/keyv';
import { emojiMap } from '../../jobs/emojiMap';
import { commandNames, prefix } from '../../config/config.json';

async function replaceMessageThroughWebhook(message: CommandoMessage, resendContent: string) {
  if (message.channel.id === allChannels.counting) {
    return;
  }

  if (message.channel.type !== 'dm') {
    message.delete();
  }

  const webhooks = await (<TextChannel>message.channel).fetchWebhooks();
  let webhook = webhooks.find((w) => w.token != null);

  const member = message.guild.member(message.author);
  const nickname = member ? member.displayName : null;
  const avatar = message.author.displayAvatarURL();

  if (!webhook) {
    webhook = await (<TextChannel>message.channel).createWebhook('Nira-chan');
  }

  webhook.send(resendContent, {
    username: nickname,
    avatarURL: avatar,
  });
}

function findEmoji(client: CommandoClient, message: CommandoMessage, emojiName: string, hasNiraPrefix: boolean) {
  if (message.channel.type !== 'dm') {
    const sameEmoji = (emoji: GuildEmoji) => emoji.available && emoji.name.toLowerCase() === emojiName.toLowerCase();
    let match = message.guild.emojis.cache.find(sameEmoji);

    if (!match) {
      if (!hasNiraPrefix) {
        match = emojiMap().get(emojiName.toLowerCase());
      } else {
        const commands = new Set();
        const groups = client.registry.groups;

        commands.add(commandNames.patpatStart.name).add(commandNames.patpatStop.name);
        groups.forEach((grp) => {
          for (const cmd of grp.commands.values()) {
            commands.add(cmd.name);
            cmd.aliases.forEach((a) => {
              commands.add(a);
            });
          }
        });

        if (!commands.has(emojiName)) {
          match = emojiMap().get(emojiName.toLowerCase());
        } else return;
      }
    }

    return match;
  }
}

export const handleNonNitroEmoji = async (message: CommandoMessage, client: CommandoClient) => {
  if ((await keyv.get(Object.keys({ nonNitroEmoji })[0])) === false) {
    return;
  }

  if (!message.member || message.channel.id == allChannels.fishy) return;

  const emojiRegex = new RegExp(String.raw`<a?:\w+:\d+>|(?<!\\):(\w+):|^${prefix}(\w+)$`, 'g');
  let needsToResend = false;

  const resendContent = message.content.replace(
    emojiRegex,
    (match: string, colonPrefix: string, niraPrefix: string) => {
      let emoji: GuildEmoji;

      if (colonPrefix) {
        emoji = findEmoji(client, message, colonPrefix, false);
      } else if (niraPrefix) {
        emoji = findEmoji(client, message, niraPrefix, true);
      }

      if (emoji) {
        needsToResend = needsToResend || emoji.animated || emoji.guild.id !== message.guild.id;
        return emoji.toString();
      }
      return match;
    },
  );

  if (needsToResend) {
    await replaceMessageThroughWebhook(message, resendContent);
  }
};
