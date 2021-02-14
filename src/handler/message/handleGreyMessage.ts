import { Message } from 'discord.js';
import { members } from '../../config/config.json';

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

export const handleGreyMessage = (message: Message) => {
  if (message.mentions.users.has(members.niraChan) && message.author.id === members.grey) {
    const response = greyResponses[Math.floor(Math.random() * greyResponses.length)];
    message.channel.startTyping();

    setTimeout(function () {
      message.channel.stopTyping();
      message.channel.send(`<@${members.grey}>, ${response}`);
    }, 3000);
  }
};
