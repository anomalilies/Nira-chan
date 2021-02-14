import { Message } from 'discord.js';

import { allChannels } from '../config/config.json';

export const handleCountingEditedMessage = (message: Message) => {
  if (message.channel.id === allChannels.counting) {
    message.delete();
  }
};
