import { Message } from 'discord.js';
// TODO change to import
// eslint-disable-next-line @typescript-eslint/no-var-requires
const uwuifying = require('../../Commands/Fun/UWU Translator/uwuify');

import { themechannels } from '../../config/config.json';

// TODO rewrite this
export const handleUwuChannelMessage = (message: Message) => {
  if (message.channel.id === themechannels.uwu) {
    uwuifying.custom(message.content, message).then(() => message.delete());
  }
};
