import { TextChannel } from 'discord.js';
import { CommandoClient } from 'discord.js-commando';

import { themeChannels } from '../../config/config.json';
import { links1, links2, links3 } from './linkEmbeds';

export const linkCommands = async (client: CommandoClient) => {
  const channel = <TextChannel>await client.channels.fetch(themeChannels.links);

  const messages = await channel.messages.fetch();
  const niraMessages = messages.filter((msg) => msg.author == client.user);

  if (niraMessages.size === 0) {
    await channel.send(links1);
    await channel.send(links2);
    await channel.send(links3);
    return;
  }

  niraMessages.array()[2].edit(links1);
  niraMessages.array()[1].edit(links2);
  niraMessages.array()[0].edit(links3);
};
