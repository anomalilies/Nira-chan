import { Message } from 'discord.js';

import { roles, emojis } from '../config/config.json';

export const handlePatPatRole = (message: Message) => {
  // The member attribute is undefined on some messages so check if it's defined first
  if (message.member && message.member.roles.cache.get(roles.patpat)) {
    if (message.content.toLowerCase().includes('patpat')) {
      message.react(emojis.patpat);
    }
  }
};
