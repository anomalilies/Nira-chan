import { Message } from 'discord.js';

import { themechannels } from '../config/config.json';

export const handleTwoWordStoryMessage = (message: Message) => {
  if (message.channel.id === themechannels.twoWordStory) {
    if (message.content.trim().split(/ +/g).length != 2) {
      return message.delete();
    }
  }
};
