import { Message } from 'discord.js';

import { allowLists, roles, homeGuild } from '../config/config.json';

export const isDmChannel = (message: Message): boolean => {
  return message.channel.type === 'dm';
};

export const isBotspamChannel = (message: Message): boolean => {
  return allowLists.botSpamChannel.includes(message.channel.id);
};

export const doesUserHaveBotpass = (message: Message): boolean => {
  return hasRole(roles.botPass, message);
};

export const hasRole = (role: string, message: Message): boolean => {
  if (message.member) {
    return message.member.roles.cache.get(role) != undefined;
  }
};

export const isHomeGuild = (message: Message): boolean => {
  if (message.guild) {
    return message.guild.id === homeGuild;
  }
};

export const isInChannel = (message: Message, channelId: string): boolean => {
  return message.channel.id === channelId;
};
