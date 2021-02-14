import { Message } from 'discord.js';

import { allChannels } from '../config/config.json';

export const handleTwoWordStoryMessage = (message: Message) => {
  if (message.channel.id === allChannels.twoWordStory) {
    if (message.content.trim().split(/ +/g).length != 2) {
      return message.delete();
    }
  }
};
