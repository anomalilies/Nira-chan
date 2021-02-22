import { GuildMember } from 'discord.js';

import { roles } from '../../config/config.json';
import { lockRegularRole } from '../../config/event_handler.json';
import { keyv } from '../../database/keyv';

// Lock Regulars for Non-Newbies
export const handleLockRegularRole = async (oldMember: GuildMember, newMember: GuildMember) => {
  if ((await keyv.get(Object.keys({ lockRegularRole })[0])) === false) {
    return;
  }

  if (oldMember.roles.cache.has(roles.newbies) && newMember.roles.cache.has(roles.regular)) {
    newMember.roles.remove(roles.regular);
  }
};
