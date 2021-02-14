import { Message } from 'discord.js';

import { emojis } from '../config/config.json';

export const handleCountingMessage = async (message: Message) => {
  if (message.system || message.webhookID || message.author.bot || message.attachments.array().length) {
    return message.delete();
  }

  try {
    const messages = await message.channel.messages.fetch({ limit: 2 });

    const prevNumber = parseInt(messages.array()[1].content);

    if (isNaN(prevNumber)) {
      return console.error('Previous number is not a number!');
    }

    const nextNumber = prevNumber + 1;
    if (message.content !== nextNumber.toString()) {
      return message.delete();
    }

    if (nextNumber % 1000 === 0) {
      const pinned = await message.channel.messages.fetchPinned();
      if (pinned.size === 50) {
        await pinned.last().unpin();
      }

      message.react(emojis.yay);
      message.pin();
    }
  } catch (error) {
    console.error(error);
  }
};
