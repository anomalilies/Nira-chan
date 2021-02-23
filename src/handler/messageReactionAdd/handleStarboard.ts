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

  // TODO check if already in starboard

  const starboardChannel = <TextChannel>await reaction.client.channels.fetch(allChannels.debug);
  const embed = new MessageEmbed({
    author: { name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) },
    image: { url: message.attachments.size > 0 ? message.attachments.first().url : '' },
    color: '#F1D8F7',
    description: stripIndent`
      ${message.content}

      [context](${message.url})
    `,
    footer: { text: message.id },
    timestamp: Date.now(),
  });

  await starboardChannel.send(embed);
};
