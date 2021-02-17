import { CommandoMessage } from 'discord.js-commando';

import { uwuify } from '../../util/uwuTranslator/uwuify';
import { allChannels } from '../../config/config.json';
import { uwuChannelMessage } from '../../config/event_handler.json';
import { keyv } from '../../database/keyv';
import { isInChannel } from '../../util/checks';

export const handleUwuChannelMessage = async (message: CommandoMessage) => {
  if ((await keyv.get(Object.keys({ uwuChannelMessage })[0])) === false) {
    return;
  }

  if (isInChannel(message, allChannels.uwu)) {
    await uwuify(message.content, message);

    await message.delete();
  }
};
