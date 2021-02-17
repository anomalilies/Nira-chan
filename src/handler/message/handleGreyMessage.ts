import { CommandoMessage } from 'discord.js-commando';

import { members } from '../../config/config.json';
import { greyMessage } from '../../config/event_handler.json';
import { keyv } from '../../database/keyv';

const greyResponses = [
  'Long time no see.',
  "What's up?",
  'Can I call you today?',
  "You're awake!",
  'I want to be with you.',
  'I miss you.',
  'I love you.',
  "Aren't you dead?!",
  "I don't want to study anymore...",
  'Take my sad love.',
  'Come home to me.',
  "Don't forget me.",
  "Why won't you answer my calls?",
];

export const handleGreyMessage = async (message: CommandoMessage) => {
  if ((await keyv.get(Object.keys({ greyMessage })[0])) === false) {
    return;
  }

  if (message.mentions.users.has(members.niraChan) && message.author.id === members.grey) {
    const response = greyResponses[Math.floor(Math.random() * greyResponses.length)];
    message.channel.startTyping();

    setTimeout(function () {
      message.channel.stopTyping();
      message.channel.send(`<@${members.grey}>, ${response}`);
    }, 3000);
  }
};
