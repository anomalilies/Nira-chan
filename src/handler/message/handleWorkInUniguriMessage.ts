import { CommandoMessage } from 'discord.js-commando';

import { allChannels } from '../../config/config.json';
import { isInChannel } from '../../util/checks';
import { workInUniguriMessage } from '../../config/event_handler.json';
import { keyv } from '../../database/keyv';

const unbelievaBot = '292953664492929025';

export const handleWorkInUniguriMessage = async (message: CommandoMessage) => {
  if ((await keyv.get(Object.keys({ workInUniguriMessage })[0])) === false) {
    return;
  }

  if (!isInChannel(message, allChannels.uniguri)) {
    return;
  }

  if (message.author.id === unbelievaBot) {
    return;
  }

  if (message.content.toLowerCase() !== '!work') {
    return message.delete();
  }
};
