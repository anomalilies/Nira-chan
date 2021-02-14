import { GuildMember, TextChannel } from 'discord.js';
import { CommandoClient } from 'discord.js-commando';

import { homeguild, emojis, themechannels } from '../config/config.json';

export default async function (client: CommandoClient, member: GuildMember) {
  const modlog = <TextChannel>client.channels.cache.get(themechannels.modlog);

  if (modlog == undefined) {
    return console.error("Couldn't find modlog channel with ID", themechannels.modlog);
  }

  if (member.guild.id === homeguild) {
    modlog.send(`**${member.user.username}** left... ${emojis.wail}`);
  }
}
