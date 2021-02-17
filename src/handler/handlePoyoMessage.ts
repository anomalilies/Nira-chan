import { CommandoMessage } from 'discord.js-commando';

import { poyoMessage } from '../config/event_handler.json';
import { keyv } from '../database/keyv';

export const handlePoyoMessage = async (message: CommandoMessage) => {
  if ((await keyv.get(Object.keys({ poyoMessage })[0])) === false) {
    return;
  }

  const content = message.content.toLowerCase();

  if (content.includes('poyo') && message.author.id !== message.client.user.id) {
    const replyChance = Math.random() < 1 / 2;

    if (['poyo', 'poyo!'].includes(content) || replyChance) {
      message.say('Poyo!');
    }
  }
};
