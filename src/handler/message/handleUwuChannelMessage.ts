import { Message } from 'discord.js';
import { uwuify } from '../../util/uwuTranslator/uwuify';

import { themechannels } from '../../config/config.json';

export const handleUwuChannelMessage = async (message: Message) => {
  if (message.channel.id === themechannels.uwu) {
    await uwuify(message.content, message);

    await message.delete();
  }
};
