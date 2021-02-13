import { GuildMember, MessageEmbed, TextChannel } from 'discord.js';
import { CommandoClient } from 'discord.js-commando';

import { configFile } from '..';

export default async function (client: CommandoClient, member: GuildMember) {
  const { homeguild, members, emojis, themechannels } = await import('../config/' + configFile);

  const modlog = <TextChannel>client.channels.cache.get(themechannels.modlog);
  const generalChannel = <TextChannel>client.channels.cache.get(themechannels.general);

  if (modlog == undefined || generalChannel == undefined) {
    return console.error('Couldnt find channel modlog or general', themechannels.modlog, themechannels.general);
  }

  if (member.guild.id !== homeguild) {
    return;
  }

  const embed = new MessageEmbed()
    .setDescription(`<@${members.currentowner}> tells me that **${member.user.username}** will join shortly... 🪄`)
    .setColor(15849719);

  modlog.send(`**${member.user.username}** joined! ${emojis.hello}`);
  generalChannel.send(embed);
}
