import { GuildMember } from 'discord.js';
import { CommandoClient } from 'discord.js-commando';

import { onGuildMemberUpdate } from '../config/event_handler.json';
import { keyv } from '../database/keyv';
import { handleContributorsRole, handleLockRegularRole, handleMuteRole, handleServerBoosterRole } from '../handler';

export default async function (client: CommandoClient, oldMember: GuildMember, newMember: GuildMember) {
  if ((await keyv.get(Object.keys({ onGuildMemberUpdate })[0])) === false) {
    return;
  }

  if (oldMember.roles.cache.size === newMember.roles.cache.size) {
    return;
  }

  await handleServerBoosterRole(client, oldMember, newMember);
  await handleLockRegularRole(oldMember, newMember);
  await handleContributorsRole(oldMember, newMember);
  await handleMuteRole(oldMember, newMember);
}
