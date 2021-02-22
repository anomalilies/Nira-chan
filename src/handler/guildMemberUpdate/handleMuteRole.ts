import { GuildMember } from 'discord.js';

import { roles } from '../../config/config.json';
import { muteRole } from '../../config/event_handler.json';
import { keyv } from '../../database/keyv';

// Mute Role
export const handleMuteRole = async (oldMember: GuildMember, newMember: GuildMember) => {
  if ((await keyv.get(Object.keys({ muteRole })[0])) === false) {
    return;
  }

  const hasRoleMute = newMember.roles.cache.has(roles.mute);
  const hasRoleNewbies = newMember.roles.cache.has(roles.newbies);
  const hadRoleMute = oldMember.roles.cache.has(roles.mute);

  if (hasRoleMute) {
    if (hasRoleNewbies) {
      return newMember.roles.remove(roles.newbies);
    }

    return newMember.roles.remove(roles.VIP);
  }

  if (hadRoleMute && !hasRoleMute) {
    const timeoutInMS = 3 * 24 * 60 * 60 * 1000;

    if (Date.now() - newMember.joinedTimestamp < timeoutInMS) {
      return newMember.roles.add(roles.newbies);
    }

    return newMember.roles.add(roles.VIP);
  }
};
