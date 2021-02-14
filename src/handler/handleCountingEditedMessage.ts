import { Message } from 'discord.js';

import { themechannels } from '../config/config.json';

export const handleCountingEditedMessage = (message: Message) => {
  if (message.channel.id === themechannels.counting) {
    message.delete();
  }
};
