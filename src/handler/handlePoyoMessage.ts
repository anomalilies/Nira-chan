import { Message } from 'discord.js';

export const handlePoyoMessage = (message: Message) => {
  if (message.content.toLowerCase().includes('poyo')) {
    const replyChance = Math.random() < 1 / 2;

    if (['poyo', 'poyo!'].includes(message.content.toLowerCase()) || replyChance) {
      message.channel.send('Poyo!');
    }
  }
};
