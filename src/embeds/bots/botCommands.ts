import { TextChannel } from 'discord.js';
import { CommandoClient } from 'discord.js-commando';

import { emojis, themeChannels } from '../../config/config.json';
import { bc1, bc10, bc2, bc3, bc4, bc5, bc6, bc7, bc8, bc9 } from './botEmbeds';

export const botCommands = async (client: CommandoClient) => {
  const channel = <TextChannel>await client.channels.fetch(themeChannels.botCommands);

  const messages = await channel.messages.fetch();
  const niraMessages = messages.filter((msg) => msg.author == client.user);

  if (niraMessages.size === 0) {
    await channel.send('**Please keep bot commands strictly to channels in the Bots category only** - Thank you!');
    await channel.send(emojis.spacer);
    await channel.send('**`!` Prefix**\nThe following commands use `!` as a prefix.');
    await channel.send(bc1);
    await channel.send(emojis.spacer);
    await channel.send(bc2);
    await channel.send(emojis.spacer);
    await channel.send(bc3);
    await channel.send(emojis.spacer);
    await channel.send('**`-` Prefix**\nThe following commands use `-` as a prefix.');
    await channel.send(bc4);
    await channel.send(emojis.spacer);
    await channel.send(bc5);
    await channel.send(bc6);
    await channel.send(emojis.spacer);
    await channel.send(bc7);
    await channel.send(emojis.spacer);
    await channel.send(bc8);
    await channel.send(emojis.spacer);
    await channel.send(bc9);
    await channel.send(emojis.spacer);
    await channel.send('**Miscellaneous Prefixes**');
    await channel.send(bc10);
    await channel.send(emojis.spacer);
    await channel.send(emojis.spacer);
    await channel.send(emojis.spacer);
    return;
  }

  niraMessages.array()[22].edit(bc1);
  niraMessages.array()[20].edit(bc2);
  niraMessages.array()[18].edit(bc3);
  niraMessages.array()[15].edit(bc4);
  niraMessages.array()[13].edit(bc5);
  niraMessages.array()[12].edit(bc6);
  niraMessages.array()[10].edit(bc7);
  niraMessages.array()[8].edit(bc8);
  niraMessages.array()[6].edit(bc9);
  niraMessages.array()[3].edit(bc10);
};
