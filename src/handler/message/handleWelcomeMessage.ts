import { Message, TextChannel, MessageEmbed } from 'discord.js';
import { CommandoClient } from 'discord.js-commando';

import { homeGuild, emojis, roles } from '../../config/config.json';

/**
 * Welcome Message and Role
 */
export const handleWelcomeMessage = (message: Message, client: CommandoClient) => {
  if (message.type === 'GUILD_MEMBER_JOIN' && message.guild.id === homeGuild) {
    const list = client.guilds.cache.get(homeGuild);
    const newbiesRole = list.roles.cache.find((role) => role.id == roles.newbies);
    if (!message.author.bot) {
      message.member.roles.add(newbiesRole);
    }

    const channel = <TextChannel>client.channels.cache.get('603246092402032673');
    channel.send(emojis.wave).then(() => {
      if (Math.random() < 1 / 100) {
        const embed = new MessageEmbed()
          .setDescription(
            `Attention all ZUTOMAYO stans!\n<@${client.user.id}> is in trouble! She needs your help to pay for intensive therapy to relieve the burdens of her past traumas.\nAll she needs is your mum's credit card number, the expiration date, and those 3 *wacky* numbers on the back!\nHurry, and click that shiny 'Server Boost' button **__NOW__!** <:niragun:772343025099603988>`,
          )
          .setColor(15849719);
        channel.send(embed);
      }
    });
  }
};
