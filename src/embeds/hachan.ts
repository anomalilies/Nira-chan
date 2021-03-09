import { TextChannel } from 'discord.js';
import { CommandoClient } from 'discord.js-commando';

export const hachan = async (client: CommandoClient) => {
  const targetGuild = client.guilds.cache.get('764936595966918706');
  const targetChannel = targetGuild.channels.cache.find((channel: any) => channel.name.toLowerCase() === 'nira-chan');
  console.log(targetChannel);
  (targetChannel as TextChannel).send('JAJAJAJAJAJAJA');
  return;
};
