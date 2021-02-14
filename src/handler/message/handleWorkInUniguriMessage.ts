import { Message } from 'discord.js';

import { allChannels } from '../../config/config.json';

export const handleWorkInUniguriMessage = (message: Message) => {
  if (message.channel.id !== allChannels.uniguri) {
    return;
  }

  if (message.content.toLowerCase() === '!work') {
    return;
  }

  message.delete();
};
