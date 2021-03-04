import { MessageReaction } from 'discord.js';

import { allChannels } from '../../config/config.json';
import { starboardMessage } from '../../config/event_handler.json';
import { keyv } from '../../database/keyv';
import { handleStarReaction } from './handleStarReaction';

export const handleStarboard = async (reaction: MessageReaction) => {
  if ((await keyv.get(Object.keys({ starboardMessage })[0])) === false) {
    return;
  }

  await handleStarReaction(reaction, allChannels.starboard);
};
