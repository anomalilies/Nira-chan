import { Guild, GuildMember, MessageEmbed, TextChannel } from 'discord.js';
import { CommandoClient } from 'discord.js-commando';

import { onGuildCreate } from '../config/event_handler.json';
import { keyv } from '../database/keyv';

export default async function (client: CommandoClient, guild: Guild) {
  if ((await keyv.get(Object.keys({ onGuildCreate })[0])) === false) {
    return;
  }

  const guildLog = <TextChannel>await client.channels.fetch('823270262194569216');
  guildLog.send('Joined a new guild: ' + guild.name);

  const greeting = 'Hello'

  let found = 0;
  guild.channels.cache.map((c) => {
    try {
      if (found === 0 && c.type === 'text') {
        if (
          c.permissionsFor(client.user).has('VIEW_CHANNEL') === true &&
          c.permissionsFor(client.user).has('SEND_MESSAGES') === true
        ) {
          (c as TextChannel).send(greeting);
          found = 1;
        }
      } else {
        guild.owner.send(greeting);
      }
    } catch (err) {
      console.log(err);
    }
  });
}
