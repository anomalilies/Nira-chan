import { CommandoClient } from 'discord.js-commando';

import { onGuildEmojiCreate } from '../config/event_handler.json';
import { keyv } from '../database/keyv';
import { updateMap } from '../jobs/emojiMap';

export default async function (client: CommandoClient) {
  if ((await keyv.get(Object.keys({ onGuildEmojiCreate })[0])) === false) {
    return;
  }

  updateMap(client);
}