import { MessageEmbed, User } from 'discord.js';

export const createDefaultEmbed = (
  title: string,
  description: string,
  color: string | number = 15849719,
  author?: User,
) => {
  const embed = new MessageEmbed().setColor(color).setTitle(title).setDescription(description);

  if (author != null || author != undefined) {
    embed.setAuthor(author.username, author.avatarURL({ dynamic: true }));
  }

  return embed;
};
