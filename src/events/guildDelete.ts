import { Guild, MessageEmbed, TextChannel } from 'discord.js';
import { CommandoClient } from 'discord.js-commando';

import { onGuildDelete } from '../config/event_handler.json';
import { keyv } from '../database/keyv';

export default async function (client: CommandoClient, guild: Guild) {
  if ((await keyv.get(Object.keys({ onGuildDelete })[0])) === false) {
    return;
  }

  const guildLog = <TextChannel>await client.channels.fetch('823270262194569216');
  guildLog.send('Left a guild: ' + guild.name);
}
