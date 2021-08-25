import { MessageEmbed, User } from 'discord.js';

export const createDefaultEmbed = (
  title: string,
  description: string,
  color: number | number = 15849719,
  author?: User,
) => {
  const embed = new MessageEmbed({
    color,
    title,
    description,
  });

  if (author != null || author != undefined) {
    embed.setAuthor(author.tag, author.avatarURL({ dynamic: true }));
  }

  return embed;
};
