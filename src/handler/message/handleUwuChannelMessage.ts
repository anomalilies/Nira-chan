import { Message } from 'discord.js';
import { uwuify } from '../../util/uwuTranslator/uwuify';

import { allChannels } from '../../config/config.json';

export const handleUwuChannelMessage = async (message: Message) => {
  if (message.channel.id === allChannels.uwu) {
    await uwuify(message.content, message);

    await message.delete();
  }
};
