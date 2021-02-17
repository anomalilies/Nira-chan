import { CommandoClient, CommandoMessage } from 'discord.js-commando';

import { niraMessageReactions } from '../config/event_handler.json';
import { keyv } from '../database/keyv';

// Remove Nira Reactions from edited messages
export const handleNiraMessageReactions = async (message: CommandoMessage, client: CommandoClient) => {
  if ((await keyv.get(Object.keys({ niraMessageReactions })[0])) === false) {
    return;
  }

  const niraChan = client.user.id;
  const userReactions = message.reactions.cache.filter((reaction) => reaction.users.cache.has(niraChan));

  for (const reaction of userReactions.values()) {
    await reaction.users.remove(niraChan);
  }
};
