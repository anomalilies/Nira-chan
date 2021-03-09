import { TextChannel } from 'discord.js';
import { CommandoClient } from 'discord.js-commando';

export const hachan = async (client: CommandoClient) => {
  const channel = <TextChannel>client.channels.cache.get('786511408035528734');
  channel.send('JAJAJAJAJAJAJA');
  return;
};
