import { Guild, MessageEmbed, TextChannel } from 'discord.js';
import { CommandoClient } from 'discord.js-commando';
import { PrismaClient } from '@prisma/client';

import { prefix, colour, members } from '../config/config.json';
import { onGuildCreate } from '../config/event_handler.json';
import { keyv } from '../database/keyv';
import { updateMap } from '../jobs/emojiMap';

const prisma = new PrismaClient();

export default async function (client: CommandoClient, guild: Guild) {
  if ((await keyv.get(Object.keys({ onGuildCreate })[0])) === false) {
    return;
  }

  await prisma.auth.create({
    data: {
      guildId: guild.id,
    },
  });

  let plural = '';
  if (guild.memberCount > 1) {
    plural = 's';
  }

  const tag = await client.users.fetch(guild.ownerID)
    .then(user => user.tag)
    .catch(() => '');

  const joinEmbed = new MessageEmbed({
    title: `Joined ${guild.name}!`,
    description: `**Owner:** ${tag}\n**Owner ID:** ${guild.ownerID}`,
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
          "Nira's main, and most-popular, functionality allows users to use emojis from any server the bot is in without a Nitro subscription.\nHowever, by using Nira, you agree to not upload **hateful, degoratory, or NSFW emojis**, if you choose to opt-in to this feature.\nAny such offending content found will result in the permanent blacklist of your server's emojis from being used globally, or all servers the owner has the `Manage Emojis` permission in.\n\n**To opt in to global emoji sharing, use `" +
          prefix +
          'emojiauth`.**\nNote that you can change these settings at any time!' +
          `\n\nTo report an emoji, simply copy the ID, and contact <@${members.currentOwner}> directly, either via DM or the` +
          '`' +
          prefix +
          'contact` command.\nAll emojis available for global use can be accessed using the `' +
          prefix +
          'emojilist` command.',
        inline: false,
      },
      {
        name: 'GitHub Repo',
        value: `[Link](https://github.com/anomalilies/Nira-chan)`,
        inline: true,
      },
      {
        name: 'Discord Server',
        value: `[Link](https://discord.gg/htSDkHH)`,
        inline: true,
      },
      {
        name: 'Ko-fi',
        value: `[Link](https://ko-fi.com/uniguri)`,
        inline: true,
      },
    ],
    color: colour,
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
      console.log(`Couldn't send DM!: ${err}`);
    }
  }

  updateMap(client);
}
