import { GuildMember, MessageEmbed, TextChannel } from 'discord.js';
import { CommandoClient } from 'discord.js-commando';

import { homeguild, members, emojis, zoneChannels } from '../config/config.json';

export default async function (client: CommandoClient, member: GuildMember) {
  const modlog = <TextChannel>client.channels.cache.get(zoneChannels.modlog);
  const generalChannel = <TextChannel>client.channels.cache.get(zoneChannels.general);

  if (modlog == undefined || generalChannel == undefined) {
    return console.error('Couldnt find channel modlog or general', zoneChannels.modlog, zoneChannels.general);
  }

  if (member.guild.id !== homeguild) {
    return;
  }

  if (!member.user.bot) {
    const embed = new MessageEmbed()
      .setDescription(`<@${members.currentowner}> tells me that **${member.user.username}** will join shortly... 🪄`)
      .setColor(15849719);

    modlog.send(`**${member.user.username}** joined! ${emojis.hello}`);
    generalChannel.send(embed);
  }
}
