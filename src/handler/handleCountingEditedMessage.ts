import { Message } from 'discord.js';

import { zoneChannels } from '../config/config.json';

export const handleCountingEditedMessage = (message: Message) => {
  if (message.channel.id === zoneChannels.counting) {
    message.delete();
  }
};
