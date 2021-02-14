import { Message } from 'discord.js';
import { CommandoClient } from 'discord.js-commando';

import { emojis } from '../config/config.json';

export const handleNiraWave = (message: Message, client: CommandoClient) => {
  if (message.mentions.users.has(client.user.id)) {
    message.react(emojis.wave);
  }
};
