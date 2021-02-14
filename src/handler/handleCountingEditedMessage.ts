import { Message } from 'discord.js';

import { themeChannels } from '../config/config.json';

export const handleCountingEditedMessage = (message: Message) => {
  if (message.channel.id === themeChannels.counting) {
    message.delete();
  }
};
