import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';

import { homeGuild, emojis } from '../../config/config.json';
import { createDefaultEmbed } from '../../util/createDefaultEmbed';

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

    if (msg.channel.type !== 'dm' && msg.guild.id === homeGuild) {
      const newEmbed = createDefaultEmbed(
        'Invitation',
        `Would you like to **invite <@${this.client.user.id}> to a server** (<:niraHello:${emojis.hello}>),\nor **share ${msg.guild.name}'s invite link** (<:niraCute:${emojis.cute}>)?`,
      );

      await msg.edit(newEmbed);
      await msg.react(emojis.hello);
      await msg.react(emojis.cute);

      const reactions = await msg.awaitReactions(
        (reaction, user) => user.id === message.author.id && [emojis.hello, emojis.cute].includes(reaction.emoji.id),
        {
          max: 1,
          time: 60000,
        },
      );

      if (reactions.has(emojis.hello)) {
        await msg.edit(botInvite);
        await msg.reactions.removeAll();
      } else if (reactions.has(emojis.cute)) {
        await msg.channel.send('https://discord.gg/zutomayo');
        await msg.reactions.removeAll();
      }
      return message;
    }

    setTimeout(async () => {
      await msg.edit(botInvite);
    }, 1000);
  }
}
