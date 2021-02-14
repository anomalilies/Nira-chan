import { Message } from 'discord.js';

import { emojis } from '../config/config.json';

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
export const handleCheckNiraMojis = (message: Message) => {
  const hasEmojiDisgust = message.content.includes(emojis.disgust);
  const hasEmojiStare = message.content.includes(emojis.stare);
  const hasEmojiOwie = message.content.includes(emojis.owie);

  if (hasEmojiDisgust || hasEmojiStare || hasEmojiOwie) {
    const find_emojis = [emojis.disgust, emojis.stare, emojis.owie];
    const matched_emojis = matchEmojis(find_emojis, message.content);

    matched_emojis.forEach((e) => message.react(e));
  }
};
