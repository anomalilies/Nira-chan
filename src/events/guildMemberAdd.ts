import { GuildMember, MessageEmbed, TextChannel } from 'discord.js';
import { CommandoClient } from 'discord.js-commando';

import { homeGuild, members, emojis, themeChannels } from '../config/config.json';

export default async function (client: CommandoClient, member: GuildMember) {
  const modlog = <TextChannel>client.channels.cache.get(themeChannels.modlog);
  const generalChannel = <TextChannel>client.channels.cache.get(themeChannels.general);

  if (modlog == undefined || generalChannel == undefined) {
    return console.error('Couldnt find channel modlog or general', themeChannels.modlog, themeChannels.general);
  }

  if (member.guild.id !== homeGuild) {
    return;
  }

  const embed = new MessageEmbed()
    .setDescription(`<@${members.currentOwner}> tells me that **${member.user.username}** will join shortly... 🪄`)
    .setColor(15849719);

  modlog.send(`**${member.user.username}** joined! ${emojis.hello}`);
  generalChannel.send(embed);
}
