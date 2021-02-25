import { TextChannel, User } from 'discord.js';
import { CommandoClient } from 'discord.js-commando';

import { allChannels, emojis } from '../../config/config.json';
import { welcome1, welcome2 } from './welcomeEmbeds';

export const welcomeCommands = async (client: CommandoClient) => {
  const channel = <TextChannel>await client.channels.fetch(allChannels.welcome);

  const messages = await channel.messages.fetch();
  const niraMessages = messages.filter((msg) => msg.author == client.user);

  if (niraMessages.size === 0) {
    await channel.send(emojis.spacer);
    await channel.send(welcome1);
    await channel.send(emojis.spacer);
    await channel.send(welcome2);
    await channel.send('https://discord.gg/htSDkHH');
    await channel.send(emojis.spacer);
  } else {
    niraMessages.array()[4].edit(welcome1);
    niraMessages.array()[2].edit(welcome2);
    niraMessages.array()[4].react('756679974953549914');

    channel.guild
      .fetchVanityData()
      .then((invite) => {
        niraMessages.array()[0].edit(`https://discord.gg/${invite.code}`);
      })
      .catch(() => {
        niraMessages.array()[0].edit('https://discord.gg/htSDkHH');
      });
  }

  client.on('messageReactionAdd', async (reaction, user) => {
    if (reaction.message.id === niraMessages.array()[4].id) {
      if (
        !user.bot &&
        !(
          reaction.message.member.roles.cache.get('790791220179632128') &&
          reaction.message.member.roles.cache.get('774482130737561600')
        ) &&
        reaction.emoji.id === '756679974953549914'
      ) {
        await reaction.message.guild.members.cache.get(user.id).roles.add('791126700972441600');
      } else {
        reaction.users.remove(<User>user);
      }
    }
  });
  client.on('messageReactionRemove', async (reaction, user) => {
    if (reaction.message.id === niraMessages.array()[4].id) {
      if (!user.bot && reaction.emoji.id === '756679974953549914') {
        await reaction.message.guild.members.cache.get(user.id).roles.remove('791126700972441600');
      }
    }
  });
};
