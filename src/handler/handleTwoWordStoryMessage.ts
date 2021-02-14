import { Message } from 'discord.js';

import { themeChannels } from '../config/config.json';

export const handleTwoWordStoryMessage = (message: Message) => {
  if (message.channel.id === themeChannels.twoWordStory) {
    if (message.content.trim().split(/ +/g).length != 2) {
      return message.delete();
    }
  }
};
