import { Guild, MessageEmbed, TextChannel } from 'discord.js';
import { CommandoClient } from 'discord.js-commando';

import { prefix } from '../config/config.json';
import { onGuildCreate } from '../config/event_handler.json';
import { keyv } from '../database/keyv';

export default async function (client: CommandoClient, guild: Guild) {
  if ((await keyv.get(Object.keys({ onGuildCreate })[0])) === false) {
    return;
  }

  let plural = '';
  if (guild.memberCount > 1) {
    plural = 's';
  }

  const joinEmbed = new MessageEmbed({
    title: `Joined ${guild.name}!`,
    description: `**Owner:** ${guild.owner.user.tag}\n**Owner ID:** ${guild.owner.user.id}`,
    color: '#66BB6A',
    thumbnail: { url: guild.iconURL({ dynamic: true }) },
    footer: { text: `${guild.name} (${guild.id}) now has ${guild.memberCount} member${plural}.` },
  });

  const guildLog = <TextChannel>await client.channels.fetch('823270262194569216');
  guildLog.send(joinEmbed);

  const embed = new MessageEmbed({
    title: 'Hello!',
    description: 'Thanks so much for adding me to your server!\nUse `' + `${prefix}` + 'help` to get started!',
    fields: [
      {
        name: 'Terms of Use',
        value:
          "Nira's main, and most-popular, functionality allows users to use emojis from any server the bot is in without a Nitro subscription.\nHowever, by using Nira, you agree to not upload **hateful, degoratory emojis**.\nAny such offending content found will result in the blacklist of your server's emojis from being used globally, or having Nira banned joining any (and all) servers the owner has the `Manage Emojis` permission in.",
      },
    ],
    color: '#F1D8F7',
    thumbnail: { url: 'https://raw.githubusercontent.com/anomalilies/Nira-chan/master/Images/Nira.png' },
  });

  const channel = guild.channels.cache.find(
    (c) => c.type === 'text' && c.permissionsFor(client.user).has('SEND_MESSAGES') === true,
  );

  if (channel) {
    (channel as TextChannel).send(embed);
  } else {
    try {
      guild.owner.send(embed);
    } catch (err) {
      console.log("Couldn't send DM!: " + err);
    }
  }
}
