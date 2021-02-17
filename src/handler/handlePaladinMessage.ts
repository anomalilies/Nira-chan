import { oneLine } from 'common-tags';
import { MessageEmbed } from 'discord.js';
import { CommandoMessage } from 'discord.js-commando';

import { emojis } from '../config/config.json';
import { paladinMessage } from '../config/event_handler.json';
import { keyv } from '../database/keyv';

const paladinResponses = ['decant', 'grand paladin', emojis.wine];

export const handlePaladinMessage = async (message: CommandoMessage) => {
  if ((await keyv.get(Object.keys({ paladinMessage })[0])) === false) {
    return;
  }

  const isPaladin = paladinResponses.some((word) => message.content.toLowerCase().includes(word.toLowerCase()));

  if (!isPaladin) {
    return;
  }

  if (message.content === 'Decant.') {
    await message.react('🇩');
    await message.react('🇪');
    await message.react('🇨');
    await message.react('🇦');
    await message.react('🇳');
    await message.react('🇹');
    return;
  }

  if (Math.random() < 1 / 10) {
    const embed = new MessageEmbed({
      description: oneLine`
        It is perfection. Irreplaceable. You don't drink the **1945 Grand Paladin** anymore than you'd 
        write a shopping list on the Mona Lisa!
      `,
      color: 15849719,
    });

    await message.channel.send(embed);
  }

  message.react(emojis.wine);
};
