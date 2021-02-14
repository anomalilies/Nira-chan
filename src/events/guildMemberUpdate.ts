import { GuildMember, TextChannel } from 'discord.js';
import { CommandoClient } from 'discord.js-commando';

import { emojis, themeChannels, roles, contributorRoleNames } from '../config/config.json';

// Server Boost Message
const handleServerBoosterRole = async (client: CommandoClient, oldMember: GuildMember, newMember: GuildMember) => {
  if (!oldMember.roles.cache.has(roles.serverBoosters) && newMember.roles.cache.has(roles.serverBoosters)) {
    const channel = <TextChannel>client.channels.cache.get(themeChannels.general);

    if (channel == undefined) {
      return console.error("Couldn't find General Channel with ID", themeChannels.general);
    }

    channel.send(emojis.yay);

    newMember.roles.add(roles.botPass);
    newMember.roles.add(roles.rainbowPass);
    newMember.roles.add(roles.uniguri);
    newMember.roles.add(roles.patpat);
  }
};

// Lock Regulars for Non-Newbies
const handleLockRegularRole = (oldMember: GuildMember, newMember: GuildMember) => {
  if (oldMember.roles.cache.has(roles.newbies) && newMember.roles.cache.has(roles.regular)) {
    newMember.roles.remove(roles.regular);
  }
};

// Contributors Role
const handleContributorsRole = (oldMember: GuildMember, newMember: GuildMember) => {
  const hadContributorRole = oldMember.roles.cache.has(roles.contributor);
  const hasSomeContributorRole = newMember.roles.cache.some((r) => contributorRoleNames.includes(r.name));

  if (!hadContributorRole && hasSomeContributorRole) {
    return newMember.roles.add(roles.contributor);
  }

  if (hadContributorRole && !hasSomeContributorRole) {
    return newMember.roles.remove(roles.contributor);
  }
};

// Mute Role
const handleMuteRole = (oldMember: GuildMember, newMember: GuildMember) => {
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

export default async function (client: CommandoClient, oldMember: GuildMember, newMember: GuildMember) {
  if (oldMember.roles.cache.size === newMember.roles.cache.size) {
    return;
  }

  await handleServerBoosterRole(client, oldMember, newMember);
  handleLockRegularRole(oldMember, newMember);
  handleContributorsRole(oldMember, newMember);
  handleMuteRole(oldMember, newMember);
}
