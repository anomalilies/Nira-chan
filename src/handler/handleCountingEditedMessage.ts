import { CommandoMessage } from 'discord.js-commando';

import { allChannels } from '../config/config.json';
import { countingEditedMessage } from '../config/event_handler.json';
import { keyv } from '../database/keyv';
import { isInChannel } from '../util/checks';

export const handleCountingEditedMessage = async (message: CommandoMessage) => {
  if ((await keyv.get(Object.keys({ countingEditedMessage })[0])) === false) {
    return;
  }

  if (isInChannel(message, allChannels.counting)) {
    message.delete();
  }
};
