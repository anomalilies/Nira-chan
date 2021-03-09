import { TextChannel } from 'discord.js';
import { CommandoClient } from 'discord.js-commando';

export const hachan = async (client: CommandoClient) => {
  const channel = <TextChannel>await client.channels.cache.get('818722533624905778');

  await channel.send('JAJAJAJAJAJAJA');
  return;
};
