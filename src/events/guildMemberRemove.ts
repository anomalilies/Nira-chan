import { GuildMember, TextChannel } from 'discord.js';
import { CommandoClient } from 'discord.js-commando';

import { homeguild, emojis, zoneChannels } from '../config/config.json';

export default async function (client: CommandoClient, member: GuildMember) {
  const modlog = <TextChannel>client.channels.cache.get(zoneChannels.modlog);

  if (modlog == undefined) {
    return console.error("Couldn't find modlog channel with ID", zoneChannels.modlog);
  }

  if (member.guild.id === homeguild) {
    modlog.send(`**${member.user.username}** left... ${emojis.wail}`);
  }
}
