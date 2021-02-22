import { GuildMember, TextChannel } from 'discord.js';
import { CommandoClient } from 'discord.js-commando';

import { emojis, allChannels, roles } from '../../config/config.json';
import { serverBoosterRole } from '../../config/event_handler.json';
import { keyv } from '../../database/keyv';

// Server Boost Message
export const handleServerBoosterRole = async (
  client: CommandoClient,
  oldMember: GuildMember,
  newMember: GuildMember,
) => {
  if ((await keyv.get(Object.keys({ serverBoosterRole })[0])) === false) {
    return;
  }

  if (!oldMember.roles.cache.has(roles.serverBoosters) && newMember.roles.cache.has(roles.serverBoosters)) {
    const channel = <TextChannel>client.channels.cache.get(allChannels.general);

    if (channel == undefined) {
      return console.error("Couldn't find General Channel with ID", allChannels.general);
    }

    channel.send(emojis.yay);

    newMember.roles.add(roles.botPass);
    newMember.roles.add(roles.rainbowPass);
    newMember.roles.add(roles.uniguri);
    newMember.roles.add(roles.patpat);
  }
};
