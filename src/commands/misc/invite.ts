import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';

import { homeguild } from '../../config/config.json';
import { createDefaultEmbed } from '../../util/createDefaultEmbed';

// TODO move to config.json
const nirahello = '777736555829002281';
const niracute = '788632707789225985';

export default class InviteCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'invite',
      group: 'misc',
      memberName: 'invite',
      description: 'Get an invite for the server/bot!',
    });
  }

  async run(message: CommandoMessage) {
    const embed = createDefaultEmbed('Loading...', '<a:loading:791389606616236052>');

    const msg = await message.channel.send(embed);

    const botInvite = createDefaultEmbed(
      'Bot Invitation',
      `Click __**[here](https://discord.com/api/oauth2/authorize?client_id=${this.client.user.id}&permissions=805661760&scope=bot)**__ to invite <@${this.client.user.id}>!`,
    );

    if (msg.channel.type !== 'dm' && msg.guild.id === homeguild) {
      const newEmbed = createDefaultEmbed(
        'Invitation',
        `Would you like to **invite <@${this.client.user.id}> to a server** (<:niraHello:${nirahello}>),\nor **share ${msg.guild.name}'s invite link** (<:niraCute:${niracute}>)?`,
      );

      await msg.edit(newEmbed);
      await msg.react(nirahello);
      await msg.react(niracute);

      const reactions = await msg.awaitReactions(
        (reaction, user) => user.id === message.author.id && [nirahello, niracute].includes(reaction.emoji.id),
        {
          max: 1,
          time: 60000,
        },
      );

      if (reactions.has(nirahello)) {
        await msg.edit(botInvite);
        await msg.reactions.removeAll();
      } else if (reactions.has(niracute)) {
        await msg.channel.send('https://discord.gg/zutomayo');
        await msg.reactions.removeAll();
      }
      return message;
    }

    setTimeout(() => {
      msg.edit(botInvite);
    }, 1000);
  }
}
