import { TextChannel, User } from 'discord.js';
import { CommandoClient } from 'discord.js-commando';

import { themechannels, emojis } from '../../config/config.json';
import { welcome1, welcome2 } from './welcomeEmbeds';

export const welcomeCommands = async (client: CommandoClient) => {
  const channel = <TextChannel>await client.channels.fetch(themechannels.welcome);

  channel.messages.fetch().then((messages) => {
    const niraMessages = messages.filter((msg) => msg.author == client.user);

    if (niraMessages.size === 0) {
      channel.send(emojis.spacer);
      channel.send(welcome1);
      channel.send(emojis.spacer);
      channel.send(welcome2);
      channel.send('https://discord.gg/htSDkHH');
      channel.send(emojis.spacer);
    } else {
      niraMessages.array()[4].edit(welcome1);
      niraMessages.array()[2].edit(welcome2);
      niraMessages.array()[4].react('756679974953549914');
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
  });
};
