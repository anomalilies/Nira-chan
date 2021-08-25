/* eslint-disable no-var */
import { PrismaClient } from '@prisma/client';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import { isInChannel, isDmChannel, isHomeGuild } from '../../util/checks';
import { createDefaultEmbed } from '../../util/createDefaultEmbed';
import { allChannels } from '../../config/config.json';

import moment from 'moment';
const prisma = new PrismaClient();

export default class FishyTimerCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'fishytimer',
      aliases: ['ft'],
      group: 'fishy',
      memberName: 'fishytimer',
      description: 'See how long you have left before you can fish again!',
    });
  }

  async run(message: CommandoMessage) {
    const user = this.client.users.cache.find((u) => u.id === message.author.id);

    if (user !== undefined) {
      const target = await prisma.fishy.findUnique({
        where: {
          userId: message.author.id,
        },
      });

      const title = 'Hold Up!';
      let description: string;
      let color: number;
      const author = message.author;

      if (isDmChannel(message) || isInChannel(message, allChannels.fishy) || !isHomeGuild(message)) {
        if (target === null) {
          message.channel.send(createDefaultEmbed(title, "You've never fished before!", color, author));
        } else {
          if (Date.now() >= target.lastFish.getTime() + 7200000) {
            message.channel.send(createDefaultEmbed('Good News! ✨', 'You can fish right now!', color, author));
          } else {
            description = `You need to wait **${moment
              .duration(target.lastFish.getTime() + 7200000 - Date.now())
              .humanize()}** to fish again.`;

            const timerEmbed = createDefaultEmbed(title, description, color, author);
            message.channel.send(timerEmbed);
          }
        }
      }
      return message;
    }
  }
}
