import { oneLineTrim, stripIndent } from 'common-tags';
import { MessageReaction, User } from 'discord.js';
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
    const embed = createDefaultEmbed('Loading...', emojis.loading);

    const msg = await message.channel.send(embed);

    const botInvite = createDefaultEmbed(
      'Bot Invitation',
      oneLineTrim`
        Click __**[here](https://discord.com/api/oauth2/authorize?client_id=${this.client.user.id}
        &permissions=805661760&scope=bot)**__ to invite <@${this.client.user.id}>!
      `,
    );

    if (msg.channel.type !== 'dm' && msg.guild.id === homeGuild) {
      const newEmbed = createDefaultEmbed(
        'Invitation',
        stripIndent`Would you like to **invite <@${this.client.user.id}> to a server** (${emojis.hello}),
        or **share ${msg.guild.name}'s invite link** (${emojis.cute})?`,
      );

      await msg.edit(newEmbed);
      await msg.react(emojis.hello);
      await msg.react(emojis.cute);

      const reactions = await msg.awaitReactions(
        (r: MessageReaction, u: User) => u.id === message.author.id && [emojis.hello, emojis.cute].includes(r.emoji.id),
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
