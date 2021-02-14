import { TextChannel } from 'discord.js';
import { CommandoClient } from 'discord.js-commando';

import { allChannels } from '../../config/config.json';
import { livesAndPerformances1, livesAndPerformances2, livesAndPerformances3 } from './livesAndPerformancesEmbeds';

export const livesAndPerformancesCommands = async (client: CommandoClient) => {
  const channel = <TextChannel>await client.channels.fetch(allChannels.livesAndPerformances);

  const messages = await channel.messages.fetch();
  const niraMessages = messages.filter((msg) => msg.author == client.user);

  if (niraMessages.size === 0) {
    await channel.send(livesAndPerformances1);
    await channel.send(livesAndPerformances2);
    await channel.send(livesAndPerformances3);
    return;
  }

  niraMessages.array()[2].edit(livesAndPerformances1);
  niraMessages.array()[1].edit(livesAndPerformances2);
  niraMessages.array()[0].edit(livesAndPerformances3);
};
