import { CommandoMessage } from 'discord.js-commando';

import { roles, emojis } from '../config/config.json';
import { patPatRole } from '../config/event_handler.json';
import { keyv } from '../database/keyv';

export const handlePatPatRole = async (message: CommandoMessage) => {
  if ((await keyv.get(Object.keys({ patPatRole })[0])) === false) {
    return;
  }

  if (message.member && message.member.roles.cache.get(roles.patpat) != undefined) {
    if (message.content.toLowerCase().includes('patpat')) {
      message.react(emojis.patpat);
    }
  }
};
