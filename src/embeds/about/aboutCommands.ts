import { TextChannel } from 'discord.js';
import { CommandoClient } from 'discord.js-commando';

import { emojis, zoneChannels } from '../../config/config.json';
import { about1, about2, about3, cd1, cd2, cd3, cd4, cd5 } from './aboutEmbeds';

export const aboutCommands = async (client: CommandoClient) => {
  const channel = <TextChannel>await client.channels.fetch(zoneChannels.about);

  const messages = await channel.messages.fetch();
  const niraMessages = messages.filter((msg) => msg.author == client.user);

  if (niraMessages.size === 0) {
    await channel.send('**About**');
    await channel.send(about1);
    await channel.send(emojis.spacer);
    await channel.send(about2);
    await channel.send(emojis.spacer);
    await channel.send(about3);
    await channel.send(emojis.spacer);
    await channel.send('**Discography**');
    await channel.send(cd1);
    await channel.send(emojis.spacer);
    await channel.send(cd2);
    await channel.send(emojis.spacer);
    await channel.send(cd3);
    await channel.send(emojis.spacer);
    await channel.send(cd4);
    await channel.send(emojis.spacer);
    await channel.send(cd5);
    await channel.send(emojis.spacer);
    return;
  }

  niraMessages.array()[16].edit(about1);
  niraMessages.array()[14].edit(about2);
  niraMessages.array()[12].edit(about3);
  niraMessages.array()[9].edit(cd1);
  niraMessages.array()[7].edit(cd2);
  niraMessages.array()[5].edit(cd3);
  niraMessages.array()[3].edit(cd4);
  niraMessages.array()[1].edit(cd5);
};
