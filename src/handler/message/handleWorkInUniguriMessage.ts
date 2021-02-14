import { Message } from 'discord.js';

import { themeChannels } from '../../config/config.json';

export const handleWorkInUniguriMessage = (message: Message) => {
  if (message.channel.id !== themeChannels.uniguri) {
    return;
  }

  if (message.content.toLowerCase() === '!work') {
    return;
  }

  message.delete();
};
