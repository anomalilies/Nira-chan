import { MessageReaction, User } from 'discord.js';
import { PrismaClient } from '@prisma/client';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';

import { createDefaultEmbed } from '../../util/createDefaultEmbed';
import { colour, prefix } from '../../config/config.json';
import { updateMap } from '../../jobs/emojiMap';

const prisma = new PrismaClient();

export default class EmojiAuthCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'emojiauth',
      group: 'data',
      memberName: 'emojiauth',
      description: 'Change your settings for global emoji use.',
      guildOnly: true,
    });
  }

  async run(message: CommandoMessage) {
    const user = message.author;

    if (message.member.hasPermission('MANAGE_GUILD' || 'ADMINISTRATOR') || user.id === message.guild.ownerID) {
      const guild = await prisma.auth.findUnique({
        where: {
          guildId: message.guild.id,
        },
      });

      if (guild !== null) {
        let response: string;

        if (guild.authentication === true) {
          response = 'in** to';
        } else {
          response = 'out** of';
        }

        const msg = await message.channel.send(
          createDefaultEmbed(
            'Global Emoji Sharing',
            `You are currently **opted-${response} global emoji sharing.\nTo change your settings, react below!`,
            colour,
            user,
          ),
        );
        const emojiIn = '865008562978422785';
        const emojiOut = '865008563529187358';

        await msg.react(emojiIn);
        await msg.react(emojiOut);

        const filter = (r: MessageReaction, u: User) => u.id === user.id && [emojiIn, emojiOut].includes(r.emoji.id);
        const reactions = await msg.awaitReactions(filter, {
          max: 1,
          time: 60000,
        });

        if (reactions.size === 1) {
          if (reactions.has(emojiIn)) {
            await prisma.auth.update({
              where: {
                guildId: message.guild.id,
              },
              data: {
                authentication: true,
              },
            });
          } else if (reactions.has(emojiOut)) {
            await prisma.auth.update({
              where: {
                guildId: message.guild.id,
              },
              data: {
                authentication: false,
              },
            });
          }
          await msg.edit(
            createDefaultEmbed(
              'Changes Confirmed',
              'Note that you can change these settings at any time by using `' + prefix + 'emojiauth`!',
              colour,
              user,
            ),
          );
          updateMap(this.client);
        } else {
          await msg.edit(createDefaultEmbed('Cancelled Command', 'No changes made.', colour, user));
        }

        return await msg.reactions.removeAll();
      }
    } else {
      message.channel.send(
        createDefaultEmbed(
          'Insufficient Permissions',
          'This command can only be run by members with the `Manage Server` permission.',
          colour,
          user,
        ),
      );
    }
  }
}
