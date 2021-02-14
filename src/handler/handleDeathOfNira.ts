import { Message, MessageReaction, User } from 'discord.js';

import { emojis } from '../config/config.json';

export const handleDeathOfNira = (message: Message) => {
  const testingNira = '764990952510717973';
  const niraWave = emojis.wave.replace(/\D/g, '');
  if (message.mentions.users.has(testingNira)) {
    const filter = (reaction: MessageReaction, user: User) => user.id === testingNira && reaction.emoji.id === niraWave;

    message.awaitReactions(filter, { max: 1, time: 3500 }).then((collected) => {
      if (!collected.size) {
        message.react('756582453824454727');
      }
    });
  }
};
