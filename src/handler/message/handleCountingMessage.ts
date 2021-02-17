import { CommandoMessage } from 'discord.js-commando';

import { emojis, allChannels } from '../../config/config.json';
import { countingMessage } from '../../config/event_handler.json';
import { keyv } from '../../database/keyv';

export const handleCountingMessage = async (message: CommandoMessage) => {
  if ((await keyv.get(Object.keys({ countingMessage })[0])) === false) {
    return;
  }

  if (message.channel.id === allChannels.counting) {
    if (message.system || message.webhookID || message.author.bot || message.attachments.array().length) {
      return message.delete();
    }

    try {
      const messages = await message.channel.messages.fetch({ limit: 2 });

      const prevNumber = parseInt(messages.array()[1].content);

      if (isNaN(prevNumber)) {
        console.error('Previous number is not a number!');
        return message.delete();
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
      console.error('counting', error);
    }
  }
};
