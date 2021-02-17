import { CommandoMessage } from 'discord.js-commando';

import { emojis } from '../config/config.json';
import { checkNiraMojis } from '../config/event_handler.json';
import { keyv } from '../database/keyv';

/**
 * Find specific emojis in a message
 */
function matchEmojis(findEmojis: string[], messageContent: string) {
  const emoji_regexp = /<a?:\w+:\d+>/g;
  const matches = [...messageContent.matchAll(emoji_regexp)];
  const matchedEmojis: string[] = [];
  matches.forEach((match) => {
    if (findEmojis.includes(match[0])) {
      matchedEmojis.push(match[0]);
      if (match[0] === emojis.owie) {
        matchedEmojis.push(emojis.cursed);
      }
    }
  });
  return matchedEmojis;
}

// Check for NiraMojis everywhere
export const handleCheckNiraMojis = async (message: CommandoMessage) => {
  if ((await keyv.get(Object.keys({ checkNiraMojis })[0])) === false) {
    return;
  }

  const hasEmojiDisgust = message.content.includes(emojis.disgust);
  const hasEmojiStare = message.content.includes(emojis.stare);
  const hasEmojiOwie = message.content.includes(emojis.owie);

  if (hasEmojiDisgust || hasEmojiStare || hasEmojiOwie) {
    const searchEmojis = [emojis.disgust, emojis.stare, emojis.owie];
    const foundEmojis = matchEmojis(searchEmojis, message.content);

    foundEmojis.forEach((e) => message.react(e));
  }
};
