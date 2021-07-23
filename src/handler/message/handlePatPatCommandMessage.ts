import { CommandoMessage } from 'discord.js-commando';

import { members, commandNames, emojis } from '../../config/config.json';
import patpatresponses from '../../data/patpatresponses.json';
import nira9000 from '../../data/nira9000.json';
import { createDefaultEmbed } from '../../util/createDefaultEmbed';
import { isDmChannel, isBotspamChannel, isHomeGuild, doesUserHaveBotpass } from '../../util/checks';
import { patPatCommandMessage } from '../../config/event_handler.json';
import { keyv } from '../../database/keyv';

const whosTalkingWithPatPat = new Set();

export const handlePatPatCommandMessage = async (message: CommandoMessage, prefix: string) => {
  if ((await keyv.get(Object.keys({ patPatCommandMessage })[0])) === false) {
    return;
  }

  // Allowed in specific bot channels only
  if (isDmChannel(message) || isBotspamChannel(message) || !isHomeGuild(message) || doesUserHaveBotpass(message)) {
    let color: string;
    let title: string;
    const author = message.author;
    let description: string;

    const dave = message.author.id === members.davetan;

    if (message.content.toLowerCase() === prefix + commandNames.patpatStart.name) {
      // PatPat: start new conversations
      whosTalkingWithPatPat.add(message.author.id);

      if (dave) {
        color = '#ffc2e8';
        title = 'Nira-chan has entered the chat';
        description = `${emojis.hal} Hewwo, Dave!~~ （＾∀＾）`;
      } else {
        color = '#99ff00';
        title = 'PatPat has entered the chat';
        description = `Salutations, gamer! ${emojis.patpat}`;
      }

      const patPatEmbed = createDefaultEmbed(title, description, color, author);
      return await message.channel.send(patPatEmbed);
    }

    if (message.content.toLowerCase() === prefix + commandNames.patpatStop.name) {
      // PatPat: end conversations
      whosTalkingWithPatPat.delete(message.author.id);

      if (dave) {
        color = '#ffc2e8';
        title = 'Nira-chan has left the chat';
        description = `${emojis.hal} D-Dave, this convewsation can sewve nyo puwpose anymoweu(⋟﹏⋞) Goodbyeu~`;
      } else {
        color = '#ff9900';
        title = 'PatPat has left the chat';
        description = `Gud niet yeahyeah— ${emojis.patpat}`;
      }

      const patPatEmbed = createDefaultEmbed(title, description, color, author);
      return await message.channel.send(patPatEmbed);
    }

    if (whosTalkingWithPatPat.has(message.author.id)) {
      // PatPat: ongoing conversations
      if (dave) {
        color = '#ffc2e8';
        title = 'Nira-chan says...';
        description = `${emojis.hal} ${nira9000[Math.floor(Math.random() * nira9000.length)]}`;
      } else {
        color = '#0099ff';
        title = 'PatPat says...';
        description = `${patpatresponses[Math.floor(Math.random() * patpatresponses.length)]}`;
      }

      const patPatEmbed = createDefaultEmbed(title, description, color, author);
      return await message.channel.send(patPatEmbed);
    }
  }
};
