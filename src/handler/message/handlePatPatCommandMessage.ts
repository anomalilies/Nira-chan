import { Message } from 'discord.js';

import { homeguild, members, allowlists, zoneRoles, commandNames, emojis } from '../../config/config.json';
import patpatresponses from '../../../Data/patpatresponses.json';
import nira9000 from '../../../Data/nira9000.json';
import { createDefaultEmbed } from '../../util/createDefaultEmbed';

const whosTalkingWithPatPat = new Set();

export const handlePatPatCommandMessage = async (message: Message, prefix: string) => {
  // Allowed in specific bot channels only

  const isDmChannel = message.channel.type === 'dm';
  const isBotSpamChannel = allowlists.botspamchannels.includes(message.channel.id);
  const isHomeGuild = message.guild.id === homeguild;
  const hasBotPass = message.member.roles.cache.get(zoneRoles.botPass);

  if (isDmChannel || isBotSpamChannel || !isHomeGuild || hasBotPass) {
    let color: string;
    let title: string;
    const author = message.author;
    let description: string;

    if (message.content.toLowerCase() === prefix + commandNames.patpatstart.name) {
      // PatPat: start new conversations
      whosTalkingWithPatPat.add(message.author.id);

      if (members.friendsofnira9000.includes(message.author.id)) {
        color = '#ffc2e8';
        title = 'Nira-chan has entered the chat';
        description = `${emojis.hal} Hewwo, Dave!~~ （＾∀＾）`;
      } else {
        color = '#99ff00';
        title = 'PatPat has entered the chat';
        description = `Salutations, gamer! ${emojis.patpat}`;
      }

      const patPatEmbed = createDefaultEmbed(title, description, color, author);
      return message.channel.send(patPatEmbed);
    }

    if (message.content.toLowerCase() === prefix + commandNames.patpatstop.name) {
      // PatPat: end conversations
      whosTalkingWithPatPat.delete(message.author.id);

      if (members.friendsofnira9000.includes(message.author.id)) {
        color = '#ffc2e8';
        title = 'Nira-chan has left the chat';
        description = `${emojis.hal} D-Dave, this convewsation can sewve nyo puwpose anymoweu(⋟﹏⋞) Goodbyeu~`;
      } else {
        color = '#ff9900';
        title = 'PatPat has left the chat';
        description = `Gud niet yeahyeah— ${emojis.patpat}`;
      }

      const patPatEmbed = createDefaultEmbed(title, description, color, author);
      return message.channel.send(patPatEmbed);
    }

    if (whosTalkingWithPatPat.has(message.author.id)) {
      // PatPat: ongoing conversations
      if (message.author.id == members.davetan) {
        color = '#ffc2e8';
        title = 'Nira-chan says...';
        description = `${emojis.hal} ${nira9000[Math.floor(Math.random() * nira9000.length)]}`;
      } else {
        color = '#0099ff';
        title = 'PatPat says...';
        description = `${patpatresponses[Math.floor(Math.random() * patpatresponses.length)]}`;
      }

      const patPatEmbed = createDefaultEmbed(title, description, color, author);
      message.channel.send(patPatEmbed);
    }
  }
};
