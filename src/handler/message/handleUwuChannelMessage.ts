import { Message } from 'discord.js';
import { uwuify } from '../../util/uwuTranslator/uwuify';

import { themeChannels } from '../../config/config.json';

export const handleUwuChannelMessage = async (message: Message) => {
  if (message.channel.id === themeChannels.uwu) {
    await uwuify(message.content, message);

    await message.delete();
  }
};
