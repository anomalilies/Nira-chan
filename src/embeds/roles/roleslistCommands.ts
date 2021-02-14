import { TextChannel } from 'discord.js';
import { CommandoClient } from 'discord.js-commando';

import { emojis, themechannels } from '../../config/config.json';
import { roles1, roles2, roles3, roles4 } from './roleslistEmbeds';

export const rolesListCommands = async (client: CommandoClient) => {
  const channel = <TextChannel>await client.channels.fetch(allChannels.rolesList);

  const messages = await channel.messages.fetch();
  const niraMessages = messages.filter((msg) => msg.author == client.user);

  if (niraMessages.size === 0) {
    await channel.send('**Roles List**');
    await channel.send(roles1);
    await channel.send(emojis.spacer);
    await channel.send(roles2);
    await channel.send(emojis.spacer);
    await channel.send(roles3);
    await channel.send(emojis.spacer);
    await channel.send(roles4);
    await channel.send(emojis.spacer);
    await channel.send('**Role Shop**');
    return;
  }

  niraMessages.array()[8].edit(roles1);
  niraMessages.array()[6].edit(roles2);
  niraMessages.array()[4].edit(roles3);
  niraMessages.array()[2].edit(roles4);
};
