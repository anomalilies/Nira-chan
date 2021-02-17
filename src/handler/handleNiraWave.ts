import { Message } from 'discord.js';
import { CommandoClient } from 'discord.js-commando';

import { emojis } from '../config/config.json';
import { niraWave } from '../config/event_handler.json';
import { keyv } from '../database/keyv';

export const handleNiraWave = async (message: Message, client: CommandoClient) => {
  if ((await keyv.get(Object.keys({ niraWave })[0])) === false) {
    return;
  }

  if (message.mentions.users.has(client.user.id)) {
    message.react(emojis.wave);
  }
};
