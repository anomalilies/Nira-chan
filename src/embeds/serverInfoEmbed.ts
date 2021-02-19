import { Guild, MessageEmbed } from 'discord.js';

import moment from 'moment';

const guildRegionKeyToName = (regionKey: string): string => {
  switch (regionKey) {
    case 'brazil':
      return 'Brazil';

    case 'europe':
      return 'Europe';

    case 'hongkong':
      return 'Hong Kong';

    case 'india':
      return 'India';

    case 'japan':
      return 'Japan';

    case 'russia':
      return 'Russia';

    case 'singapore':
      return 'Singapore';

    case 'southafrica':
      return 'South Africa';

    case 'sydney':
      return 'Sydney';

    case 'us-central':
      return 'US Central';

    case 'us-east':
      return 'US East';

    case 'us-west':
      return 'US West';

    case 'us-south':
      return 'US South';

    default:
      return 'UNKNOWN';
  }
};

export default async function (guild: Guild) {
  const roles = guild.roles.cache.sort((a, b) => b.position - a.position).map((role) => role.toString());
  const members = guild.members.cache;
  const channels = guild.channels.cache;
  const serverEmojis = guild.emojis.cache;
  const owner = await guild.members.fetch(guild.ownerID);

  const ts1 = moment(guild.createdTimestamp).format('LT');
  const ts2 = moment(guild.createdTimestamp).format('LL');
  const ts3 = moment(guild.createdTimestamp).fromNow();

  return new MessageEmbed({
    title: `About ${guild.name}`,
    thumbnail: { url: guild.iconURL({ dynamic: true }) },
    color: '#F1D8F7',
    fields: [
      {
        name: 'General',
        value: [
          `**❯ Owner:** ${owner.user.tag}`,
          `**❯ Region:** ${guildRegionKeyToName(guild.region)}`,
          `**❯ Boost Tier:** ${guild.premiumTier ? `Tier ${guild.premiumTier}` : 'None'}`,
          `**❯ Creation Date:** ${ts1}, ${ts2} (${ts3})`,
          '\u200b',
        ],
      },
      {
        name: 'Statistics',
        value: [
          `**❯ Role Count:** ${roles.length}`,
          `**❯ Emoji Count:** ${serverEmojis.size} (${serverEmojis.filter((emoji) => emoji.animated).size} animated)`,
          `**❯ Member Count:** ${guild.memberCount} (${members.filter((member) => member.user.bot).size} bots)`,
          `**❯ Text Channels:** ${channels.filter((channel) => channel.type === 'text').size}`,
          `**❯ Voice Channels:** ${channels.filter((channel) => channel.type === 'voice').size}`,
          `**❯ Boost Count:** ${guild.premiumSubscriptionCount || '0'}`,
          '\u200b',
        ],
        inline: true,
      },
      {
        name: 'Presence',
        inline: true,
        value: [
          `**❯ Online:** ${members.filter((member) => member.presence.status === 'online').size}`,
          `**❯ Idle:** ${members.filter((member) => member.presence.status === 'idle').size}`,
          `**❯ Do Not Disturb:** ${members.filter((member) => member.presence.status === 'dnd').size}`,
          `**❯ Offline:** ${members.filter((member) => member.presence.status === 'offline').size}`,
        ],
      },
    ],
    footer: { text: 'Last updated' },
    timestamp: Date.now(),
  });
}
