import { CommandoClient, CommandoMessage } from 'discord.js-commando';

import { emojis } from '../config/config.json';
import { niraWave } from '../config/event_handler.json';
import { keyv } from '../database/keyv';

export const handleNiraWave = async (message: CommandoMessage, client: CommandoClient) => {
  if ((await keyv.get(Object.keys({ niraWave })[0])) === false) {
    return;
  }

  if (message.mentions.has(client.user)) {
    message.react(emojis.wave);
  }
};
