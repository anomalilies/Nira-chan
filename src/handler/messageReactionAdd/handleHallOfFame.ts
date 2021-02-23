import { stripIndent } from 'common-tags';
import { MessageEmbed, MessageReaction, TextChannel } from 'discord.js';

import { emojis, allChannels, roles, allowLists } from '../../config/config.json';
import { hallOfFameMessage } from '../../config/event_handler.json';
import { keyv } from '../../database/keyv';

const neededStars = 5;

export const handleHallOfFame = async (reaction: MessageReaction) => {
  if ((await keyv.get(Object.keys({ hallOfFameMessage })[0])) === false) {
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

  if (!allowLists.contributionChannels.includes(message.channel.id)) {
    return;
  }

  const user = await message.guild.members.fetch(message.author.id);
  const isContributor = user.roles.cache.has(roles.contributor);

  if (!isContributor) {
    return;
  }

  // TODO check if already in Hall of Fame

  const hallOfFameChannel = <TextChannel>await reaction.client.channels.fetch(allChannels.hallOfFame);
  const embed = new MessageEmbed({
    author: { name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) },
    image: { url: message.attachments.size > 0 ? message.attachments.first().url : '' },
    color: '#FFAC33',
    description: stripIndent`
      ${message.content}

      [context](${message.url})
    `,
    footer: { text: message.id },
    timestamp: Date.now(),
  });

  await hallOfFameChannel.send(embed);
};
