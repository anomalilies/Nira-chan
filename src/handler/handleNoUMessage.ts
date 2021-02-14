import { Message } from 'discord.js';

import { members } from '../config/config.json';

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
];

export const handleNoUMessage = (message: Message) => {
  const isNoU = noUResponses.some((word) => message.content.toLowerCase() === word.toLowerCase());
  const isNoUInfinityMember = members.noutimesinfinity.includes(message.author.id);
  const noUChance = Math.random() < 1 / 3;

  if (isNoU && (noUChance || isNoUInfinityMember)) {
    const response = noUResponses[Math.floor(Math.random() * noUResponses.length)];
    message.channel.send(response);
  }
};
