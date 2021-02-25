import { stripIndent } from 'common-tags';
import { MessageEmbed, MessageReaction, TextChannel } from 'discord.js';

import { emojis, allChannels } from '../../config/config.json';
import { starboardMessage } from '../../config/event_handler.json';
import { keyv } from '../../database/keyv';

const neededStars = 5;

export const handleStarboard = async (reaction: MessageReaction) => {
  if ((await keyv.get(Object.keys({ starboardMessage })[0])) === false) {
    return;
  }

  if (reaction.emoji.toString() !== emojis.star) {
    return;
  }

  const message = reaction.message;
  const stars = message.reactions.resolve(emojis.star).count;

  if (stars < neededStars) {
    return;
  }

  const starboardChannel = <TextChannel>await reaction.client.channels.fetch(allChannels.starboard);
  const lastMessages = await starboardChannel.messages.fetch({ limit: 100 });
  const msg = lastMessages.find((m) => {
    if (m.embeds.length < 1) {
      return false;
    }

    if (m.embeds[0].footer == null) {
      return false;
    }

    return m.embeds[0].footer.text.split(' ')[3] === message.id;
  });

  const footer = [stars, emojis.star, '#' + (<TextChannel>message.channel).name, message.id];
  const embed = new MessageEmbed({
    author: { name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) },
    image: { url: message.attachments.size > 0 ? message.attachments.first().url : '' },
    color: '#F1D8F7',
    description: stripIndent`
      ${message.content}

      [context](${message.url})
    `,
    footer: { text: footer.join(' ') },
    timestamp: Date.now(),
  });

  if (msg != undefined) {
    return await msg.edit(embed);
  }

  await starboardChannel.send(embed);
};
