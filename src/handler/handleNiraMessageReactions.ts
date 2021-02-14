import { Message } from 'discord.js';
import { CommandoClient } from 'discord.js-commando';

// Remove Nira Reactions from edited messages
export const handleNiraMessageReactions = async (message: Message, client: CommandoClient) => {
  const niraChan = client.user.id;
  const userReactions = message.reactions.cache.filter((reaction) => reaction.users.cache.has(niraChan));

  for (const reaction of userReactions.values()) {
    await reaction.users.remove(niraChan);
  }
};
