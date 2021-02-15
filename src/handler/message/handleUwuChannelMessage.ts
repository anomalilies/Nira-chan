import { Message } from 'discord.js';
import { uwuify } from '../../util/uwuTranslator/uwuify';

import { zoneChannels } from '../../config/config.json';

export const handleUwuChannelMessage = async (message: Message) => {
  if (message.channel.id === zoneChannels.uwu) {
    await uwuify(message.content, message);

    await message.delete();
  }
};
