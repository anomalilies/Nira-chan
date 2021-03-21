import { Guild, MessageEmbed, TextChannel } from 'discord.js';
import { CommandoClient } from 'discord.js-commando';

import { prefix } from '../config/config.json';
import { onGuildCreate } from '../config/event_handler.json';
import { keyv } from '../database/keyv';

export default async function (client: CommandoClient, guild: Guild) {
  if ((await keyv.get(Object.keys({ onGuildCreate })[0])) === false) {
    return;
  }

  const joinEmbed = new MessageEmbed({
    title: 'Joined Guild!',
    description: `Joined ${guild.name} with ${guild.memberCount} members.`,
    color: '#66BB6A',
    thumbnail: { url: guild.iconURL({ dynamic: true }) },
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

  let found = 0;
  guild.channels.cache.map((c) => {
    try {
      if (found === 0 && c.type === 'text') {
        if (
          c.permissionsFor(client.user).has('VIEW_CHANNEL') === true &&
          c.permissionsFor(client.user).has('SEND_MESSAGES') === true
        ) {
          (c as TextChannel).send(embed);
          found = 1;
        }
      } else {
        guild.owner.send(embed);
      }
    } catch (err) {
      console.log(err);
    }
  });
}
