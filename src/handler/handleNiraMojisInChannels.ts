import { CommandoMessage } from 'discord.js-commando';

import { allowLists, emojis } from '../config/config.json';
import { niraMojisInChannels } from '../config/event_handler.json';
import { keyv } from '../database/keyv';

const handleMessage = (channels: string[], emoji: string, message: CommandoMessage) => {
  try {
    if (channels.includes(message.channel.id)) {
      if (emoji !== message.content) {
        message.delete();
      }
    }
  } catch (err) {
    console.log(err);
  }
};

// Check for NiraMojis in their channels
export const handleNiraMojisInChannels = async (message: CommandoMessage) => {
  if ((await keyv.get(Object.keys({ niraMojisInChannels })[0])) === false) {
    return;
  }

  handleMessage(allowLists.disgustChannels, emojis.disgust, message);
  handleMessage(allowLists.stareChannels, emojis.stare, message);
  handleMessage(allowLists.owieChannels, emojis.owie, message);
};
