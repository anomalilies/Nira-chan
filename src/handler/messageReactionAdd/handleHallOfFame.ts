import { MessageReaction } from 'discord.js';

import { allChannels, allowLists } from '../../config/config.json';
import { hallOfFameMessage } from '../../config/event_handler.json';
import { keyv } from '../../database/keyv';
import { handleStarReaction } from './handleStarReaction';

export const handleHallOfFame = async (reaction: MessageReaction) => {
  if ((await keyv.get(Object.keys({ hallOfFameMessage })[0])) === false) {
    return;
  }

  if (!allowLists.contributionChannels.includes(reaction.message.channel.id)) {
    return;
  }

  await handleStarReaction(reaction, allChannels.hallOfFame);
};
