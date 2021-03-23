import { MessageEmbed, User } from 'discord.js';

export const createDefaultEmbed = (
  title: 'Hold Up!',
  description: `You need to wait **${moment
    .duration(Date.now() + 7200000 - target.lastFish.getTime())
    .humanize()}** to fish again.`,
  color: ,
  author?: User,
) => {
  const embed = new MessageEmbed({
    color,
    title,
    description,
  });

  if (author != null || author != undefined) {
    embed.setAuthor(author.username, author.avatarURL({ dynamic: true }));
  }

  return embed;
};
