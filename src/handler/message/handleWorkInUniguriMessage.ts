import { Message } from 'discord.js';

import { zoneChannels } from '../../config/config.json';

export const handleWorkInUniguriMessage = (message: Message) => {
  if (message.channel.id !== zoneChannels.uniguri) {
    return;
  }

  if (message.content.toLowerCase() === '!work') {
    return;
  }

  message.delete();
};
