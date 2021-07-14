import { GuildMember, MessageEmbed, TextChannel } from 'discord.js';
import { CommandoClient } from 'discord.js-commando';

import { homeGuild, members, emojis, allChannels, colour } from '../config/config.json';
import { onGuildMemberAdd } from '../config/event_handler.json';
import { keyv } from '../database/keyv';

export default async function (client: CommandoClient, member: GuildMember) {
  if ((await keyv.get(Object.keys({ onGuildMemberAdd })[0])) === false) {
    return;
  }

  const modlog = <TextChannel>client.channels.cache.get(allChannels.modlog);
  const generalChannel = <TextChannel>client.channels.cache.get(allChannels.general);

  if (modlog == undefined || generalChannel == undefined) {
    return console.error('Couldnt find channel modlog or general', allChannels.modlog, allChannels.general);
  }

  if (member.guild.id !== homeGuild) {
    return;
  }

  const embed = new MessageEmbed({
    description: `<@${members.currentOwner}> tells me that **${member.user.username}** will join shortly... 🪄`,
    color: colour,
  });

  modlog.send(`**${member.user.username}** joined! ${emojis.hello}`);
  generalChannel.send(embed);
}
