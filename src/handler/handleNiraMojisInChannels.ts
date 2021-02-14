import { Message } from 'discord.js';

import { allowlists, emojis } from '../config/config.json';

const handleMessage = (channels: string[], emoji: string, message: Message) => {
  if (channels.includes(message.channel.id)) {
    if (emoji !== message.content) {
      message.delete();
    }
  }
};

// Check for NiraMojis in their channels
export const handleNiraMojisInChannels = (message: Message) => {
  handleMessage(allowlists.disgustchannels, emojis.disgust, message);
  handleMessage(allowlists.starechannels, emojis.stare, message);
  handleMessage(allowlists.owiechannels, emojis.owie, message);
};
