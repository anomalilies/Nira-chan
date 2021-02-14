import { TextChannel } from 'discord.js';
import { CommandoClient } from 'discord.js-commando';

import { emojis, allChannels } from '../../config/config.json';
import { archive, nitro } from './archiveEmbeds';

export const archiveCommands = async (client: CommandoClient) => {
  const channel = <TextChannel>await client.channels.fetch(allChannels.archive);

  const messages = await channel.messages.fetch();
  const niraMessages = messages.filter((msg) => msg.author == client.user);

  if (niraMessages.size === 0) {
    await channel.send(archive);
    await channel.send('https://discord.gg/tBerq3wjtW');
    await channel.send(emojis.spacer);
    await channel.send(nitro);
    await channel.send(emojis.spacer);
    await channel.send(emojis.spacer);
    return;
  }

  niraMessages.array()[5].edit(archive);
  niraMessages.array()[2].edit(nitro);
};
