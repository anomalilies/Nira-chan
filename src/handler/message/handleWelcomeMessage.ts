import { stripIndent } from 'common-tags';
import { TextChannel, MessageEmbed } from 'discord.js';
import { CommandoClient, CommandoMessage } from 'discord.js-commando';

import { homeGuild, emojis, roles, allChannels } from '../../config/config.json';
import { welcomeMessage } from '../../config/event_handler.json';
import { keyv } from '../../database/keyv';

/**
 * Welcome Message and Role
 */
export const handleWelcomeMessage = async (message: CommandoMessage, client: CommandoClient) => {
  if ((await keyv.get(Object.keys({ welcomeMessage })[0])) === false) {
    return;
  }

  if (message.type === 'GUILD_MEMBER_JOIN' && message.guild.id === homeGuild) {
    const list = client.guilds.cache.get(homeGuild);
    const newbiesRole = list.roles.cache.find((role) => role.id == roles.newbies);
    if (!message.author.bot) {
      message.member.roles.add(newbiesRole);
    }

    const channel = <TextChannel>client.channels.cache.get(allChannels.general);
    await channel.send(emojis.wave);

    if (Math.random() < 1 / 100) {
      const embed = new MessageEmbed({
        color: 15849719,
        description: stripIndent`
          Attention all ZUTOMAYO stans!
          <@${client.user.id}> is in trouble! She needs your help to pay for intensive therapy to relieve the burdens of her past traumas.
          All she needs is your mum's credit card number, the expiration date, and those 3 *wacky* numbers on the back!
          Hurry, and click that shiny 'Server Boost' button **__NOW__!** <:niragun:772343025099603988>
        `,
      });

      channel.send(embed);
    }
  }
};
