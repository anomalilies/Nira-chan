import { MessageEmbed, MessageReaction, User } from 'discord.js';
import { PrismaClient } from '@prisma/client';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';

import { createDefaultEmbed } from '../../util/createDefaultEmbed';
import { colour, emojis, prefix, members } from '../../config/config.json';

const prisma = new PrismaClient();

export default class FishyDataDeletionCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'deletedata',
      group: 'data',
      memberName: 'deletedata',
      description: 'Delete your fishy stats!',
    });
  }

  async run(message: CommandoMessage) {
    const user = this.client.users.cache.find((u) => u.id === message.author.id);

    const embed = new MessageEmbed({
      author: { name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) },
      title: 'Request Data Deletion',
      description: "Are you sure you'd like to delete your fishy data?",
      color: colour,
    });
    const msg = await message.channel.send(embed);

    await msg.react(emojis.yes);
    await msg.react(emojis.no);

    const filter = (r: MessageReaction, u: User) =>
      u.id === message.author.id && [emojis.yes, emojis.no].includes(r.emoji.name);
    const reactions = await msg.awaitReactions(filter, {
      max: 1,
      time: 60000,
    });

    const target = await prisma.fishy.findUnique({
      where: {
        userId: user.id,
      },
    });

    if (user !== undefined && target !== null) {
      if (reactions.has(emojis.yes)) {
        await prisma.fishy.delete({
          where: {
            userId: user.id,
          },
        });
        msg.edit(
          createDefaultEmbed(
            'Data Deletion Successful',
            'To create new data, simply run `' + prefix + 'fishy` again!',
            colour,
            user,
          ),
        );
      } else if (reactions.has(emojis.no)) {
        msg.edit(createDefaultEmbed('Cancelled Command', 'No changes made.', colour, user));
      }
    } else {
      msg.edit(
        createDefaultEmbed(
          'User Not Found',
          `If you think this is a mistake, please contact <@${members.currentOwner}> directly for assistance.`,
          colour,
          user,
        ),
      );
    }
    if (msg.channel.type !== 'dm') {
      return await msg.reactions.removeAll();
    }
  }
}
