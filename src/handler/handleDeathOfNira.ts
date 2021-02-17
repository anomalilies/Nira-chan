import { MessageReaction, User } from 'discord.js';
import { CommandoMessage } from 'discord.js-commando';

import { emojis } from '../config/config.json';
import { deathOfNira } from '../config/event_handler.json';
import { keyv } from '../database/keyv';

export const handleDeathOfNira = async (message: CommandoMessage) => {
  if ((await keyv.get(Object.keys({ deathOfNira })[0])) === false) {
    return;
  }

  const testingNira = '764990952510717973';
  const niraWave = emojis.wave.replace(/\D/g, '');
  if (message.mentions.users.has(testingNira)) {
    const filter = (reaction: MessageReaction, user: User) => user.id === testingNira && reaction.emoji.id === niraWave;

    const collected = await message.awaitReactions(filter, { max: 1, time: 1000 });

    if (collected.size === 0) {
      message.react(emojis.dead);
    } else {
      message.react(emojis.hello);
    }
  }
};
