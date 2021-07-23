import { CommandoMessage } from 'discord.js-commando';

import { members } from '../config/config.json';
import { noUMessage } from '../config/event_handler.json';
import { keyv } from '../database/keyv';

const noUResponses = [
  'no u',
  "yesn't men't",
  'nay thee',
  '[Rn] 5f¹⁴7s² × [Rn] 5f³6d¹7s²',
  'n-nyo u~wu',
  'Nobelium Uranium',
  'non tu',
  'no vos',
  '102 + 92',
  '`6e 6f 20 75`',
  '🇳 🇴  🇺',
  'ノユ',
  '∩O ∪',
  '∩∅ ∪',
  '`01101110 01101111 00100000 01110101`',
  '`-. --- / ..-`',
  '`110 111 32 117`',
  '`&#110;&#111;&#32;&#117;`',
  'ⁿᵒ ᵘ',
  'no tu',
];

export const handleNoUMessage = async (message: CommandoMessage) => {
  if ((await keyv.get(Object.keys({ noUMessage })[0])) === false) {
    return;
  }

  const isNoU = noUResponses.some((word) => message.content.toLowerCase() === word.toLowerCase());
  const noUChance = Math.random() < 1 / 3;

  if (isNoU && (noUChance || message.author.id === members.soldier) && message.author.id !== message.client.user.id) {
    const response = noUResponses[Math.floor(Math.random() * noUResponses.length)];

    message.say(response);
  }
};
