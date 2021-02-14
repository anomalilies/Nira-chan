import { GuildMember, TextChannel } from 'discord.js';
import { CommandoClient } from 'discord.js-commando';

import { homeGuild, emojis, themeChannels } from '../config/config.json';

export default async function (client: CommandoClient, member: GuildMember) {
  const modlog = <TextChannel>client.channels.cache.get(themeChannels.modlog);

  if (modlog == undefined) {
    return console.error("Couldn't find modlog channel with ID", themeChannels.modlog);
  }

  if (member.guild.id === homeGuild) {
    modlog.send(`**${member.user.username}** left... ${emojis.wail}`);
  }
}
