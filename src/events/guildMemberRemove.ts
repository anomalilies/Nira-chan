import { GuildMember, TextChannel } from 'discord.js';
import { CommandoClient } from 'discord.js-commando';

import { homeGuild, emojis, allChannels } from '../config/config.json';
import { onGuildMemberRemove } from '../config/event_handler.json';
import { keyv } from '../database/keyv';

export default async function (client: CommandoClient, member: GuildMember) {
  if ((await keyv.get(Object.keys({ onGuildMemberRemove })[0])) === false) {
    return;
  }

  const modlog = <TextChannel>client.channels.cache.get(allChannels.modlog);

  if (modlog == undefined) {
    return console.error("Couldn't find modlog channel with ID", allChannels.modlog);
  }

  if (member.guild.id === homeGuild) {
    modlog.send(`**${member.user.username}** left... ${emojis.wail}`);
  }
}
