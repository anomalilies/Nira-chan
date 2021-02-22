import { GuildMember } from 'discord.js';

import { roles, contributorRoleNames } from '../../config/config.json';
import { contributorsRole } from '../../config/event_handler.json';
import { keyv } from '../../database/keyv';

// Contributors Role
export const handleContributorsRole = async (oldMember: GuildMember, newMember: GuildMember) => {
  if ((await keyv.get(Object.keys({ contributorsRole })[0])) === false) {
    return;
  }

  const hadContributorRole = oldMember.roles.cache.has(roles.contributor);
  const hasSomeContributorRole = newMember.roles.cache.some((r) => contributorRoleNames.includes(r.name));

  if (!hadContributorRole && hasSomeContributorRole) {
    return newMember.roles.add(roles.contributor);
  }

  if (hadContributorRole && !hasSomeContributorRole) {
    return newMember.roles.remove(roles.contributor);
  }
};
