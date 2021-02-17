import { CommandoMessage } from 'discord.js-commando';

import { allChannels } from '../config/config.json';
import { twoWordStoryMessage } from '../config/event_handler.json';
import { keyv } from '../database/keyv';
import { isInChannel } from '../util/checks';

export const handleTwoWordStoryMessage = async (message: CommandoMessage) => {
  if ((await keyv.get(Object.keys({ twoWordStoryMessage })[0])) === false) {
    return;
  }

  if (isInChannel(message, allChannels.twoWordStory)) {
    if (message.content.trim().split(/ +/g).length != 2) {
      return message.delete();
    }
  }
};
