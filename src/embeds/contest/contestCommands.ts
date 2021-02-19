import { stripIndent } from 'common-tags';
import { MessageEmbed, TextChannel } from 'discord.js';
import { CommandoClient } from 'discord.js-commando';

import { allChannels, emojis } from '../../config/config.json';
import { contest1, contest2, contest3, contest4, contest5 } from './contestEmbeds';

export const contestCommands = async (client: CommandoClient) => {
  const channel = <TextChannel>await client.channels.fetch(allChannels.contest);

  const messages = await channel.messages.fetch();
  const niraMessages = messages.filter((msg) => msg.author == client.user);

  const entry = new MessageEmbed({
    color: '#F1D8F7',
    title: 'Contest Entry',
    description: stripIndent`
      Register your interest in joining this contest by **reacting with <:niraScoopYAY:777269746722668565>**!
      For submitting entries, please **use the form below**!
    `,
  });

  if (niraMessages.size === 0) {
    await channel.send(contest1);
    await channel.send(emojis.spacer);
    await channel.send(contest2);
    await channel.send(emojis.spacer);
    await channel.send(contest3);
    await channel.send(emojis.spacer);
    await channel.send(contest4);
    await channel.send(emojis.spacer);
    await channel.send(contest5);
    await channel.send(emojis.spacer);
    await channel.send(entry);
    await channel.send('https://forms.gle/rLTpuoyrofgz1x6c8');
  } else {
    niraMessages.array()[11].edit(contest1);
    niraMessages.array()[9].edit(contest2);
    niraMessages.array()[7].edit(contest3);
    niraMessages.array()[5].edit(contest4);
    niraMessages.array()[3].edit(contest5);
    niraMessages.array()[1].react('777269746722668565');
  }

  client.on('messageReactionAdd', async (reaction, user) => {
    if (reaction.message.id === niraMessages.array()[1].id) {
      if (!user.bot && reaction.emoji.id === '777269746722668565') {
        await reaction.message.guild.members.cache.get(user.id).roles.add('770792091353743401');
      }
    }
  });
  client.on('messageReactionRemove', async (reaction, user) => {
    if (reaction.message.id === niraMessages.array()[1].id) {
      if (!user.bot && reaction.emoji.id === '777269746722668565') {
        await reaction.message.guild.members.cache.get(user.id).roles.remove('770792091353743401');
      }
    }
  });
};
