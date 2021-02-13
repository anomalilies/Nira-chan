import { GuildMember, MessageEmbed, TextChannel } from 'discord.js';
import { CommandoClient } from 'discord.js-commando';

import { configFile } from '..';

export default async function (client: CommandoClient, member: GuildMember) {
  const { homeguild, members } = await import('../config/' + configFile);

  // TODO move those IDS into config file
  const modlogChannelId = '742513756059467917';
  const generalChannelId = '603246092402032673';
  const modlog = <TextChannel>client.channels.cache.get(modlogChannelId);
  const generalChannel = <TextChannel>client.channels.cache.get(generalChannelId);

  if (modlog == undefined || generalChannel == undefined) {
    return console.error('Couldnt find channel modlog or general', modlog, generalChannelId);
  }

  if (member.guild.id !== homeguild) {
    return;
  }

  const embed = new MessageEmbed()
    .setDescription(`<@${members.currentowner}> tells me that **${member.user.username}** will join shortly... 🪄`)
    .setColor(15849719);

  modlog.send(`**${member.user.username}** joined! <:niraHello:777736555829002281>`);
  generalChannel.send(embed);
}
