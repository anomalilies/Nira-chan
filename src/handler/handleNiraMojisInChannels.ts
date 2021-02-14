import { Message } from 'discord.js';

import { allowLists, emojis } from '../config/config.json';

const handleMessage = (channels: string[], emoji: string, message: Message) => {
  if (channels.includes(message.channel.id)) {
    if (emoji !== message.content) {
      message.delete();
    }
  }
};

// Check for NiraMojis in their channels
export const handleNiraMojisInChannels = (message: Message) => {
  handleMessage(allowLists.disgustChannels, emojis.disgust, message);
  handleMessage(allowLists.stareChannels, emojis.stare, message);
  handleMessage(allowLists.owieChannels, emojis.owie, message);
};
