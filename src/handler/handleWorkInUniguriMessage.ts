import { Message } from 'discord.js';

import { themechannels } from '../config/config.json';

export const handleWorkInUniguriMessage = (message: Message) => {
  if (message.channel.id !== themechannels.uniguri) {
    return;
  }

  if (message.content.toLowerCase() === '!work') {
    return;
  }

  message.delete();
};
