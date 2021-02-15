import { Message } from 'discord.js';

import { zoneChannels } from '../config/config.json';

export const handleTwoWordStoryMessage = (message: Message) => {
  if (message.channel.id === zoneChannels.twoWordStory) {
    if (message.content.trim().split(/ +/g).length != 2) {
      return message.delete();
    }
  }
};
