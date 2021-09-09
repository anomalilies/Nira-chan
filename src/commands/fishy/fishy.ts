/* eslint-disable no-var */
import { MessageEmbed } from 'discord.js';
import { PrismaClient } from '@prisma/client';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import { isInChannel, isDmChannel, isHomeGuild } from '../../util/checks';
import { createDefaultEmbed } from '../../util/createDefaultEmbed';
import { allChannels, colour } from '../../config/config.json';
import moment from 'moment';
import * as crypto from 'crypto';

const prisma = new PrismaClient();
import fish from '../../data/fish.json';

interface PromptArgs {
  name: string;
}
type FishyStat = 'totalTrash' | 'totalCommon' | 'totalUncommon' | 'totalRare' | 'totalLegendary';

export default class FishyCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'fishy',
      aliases: ['fish', 'fihy', 'fisy', 'foshy', 'fisyh', 'fsihy', 'fin'],
      group: 'fishy',
      memberName: 'fishy',
      description: 'Go fish!',
      args: [
        {
          key: 'name',
          prompt: 'Who would you like to fish for?',
          type: 'string',
          default: '',
          validate: (name: string) => {
            if (name.match(/^<@!?\d+>$/)) return true;
            return 'Invalid user!';
          },
        },
      ],
    });
  }

  async run(message: CommandoMessage, { name }: PromptArgs) {
    let gift = false;
    if (name === '') {
      var userID = message.author.id;
    } else {
      gift = true;
      var userID = Object.values(name)
        .toString()
        .replace(/[\s,<@!>]/g, '');
    }
    const user = this.client.users.cache.find((u) => u.id === userID);

    const userLimit = await prisma.fishy.findUnique({
      where: { id: 10000 },
    });

    if (userLimit === null && user !== undefined) {
      const target = await prisma.fishy.upsert({
        where: { userId: user.id },
        update: {},
        create: { userId: user.id, lastFish: '1970-01-01T00:00:00.000Z' },
      });

      let canFish = false;

      const title = 'Hold Up!';
      let color: number;
      const author = message.author;

      var description: string;

      if (gift === true) {
        var ogAuthor = await prisma.fishy.upsert({
          where: { userId: message.author.id },
          update: {},
          create: { userId: message.author.id },
        });

        if (ogAuthor.timesFished === null || Date.now() >= ogAuthor.lastFish.getTime() + 7200000) {
          canFish = true;
        } else {
          description = `You need to wait **${moment
            .duration(ogAuthor.lastFish.getTime() + 7200000 - Date.now())
            .humanize()}** to fish again.`;
        }
      } else {
        if (target.timesFished === null || Date.now() >= target.lastFish.getTime() + 7200000) {
          canFish = true;
        } else {
          description = `You need to wait **${moment
            .duration(target.lastFish.getTime() + 7200000 - Date.now())
            .humanize()}** to fish again.`;
        }
      }

      if (isDmChannel(message) || isInChannel(message, allChannels.fishy) || !isHomeGuild(message)) {
        if (canFish === true) {
          const total = fish.reduce((acc, cur) => acc + cur.weight, 0);
          const threshold = crypto.randomInt(total);

          let sum = 0;
          const group = fish.find((group) => {
            sum += group.weight;
            return sum >= threshold;
          });

          const index = crypto.randomInt(group.puns.length);
          const fishPun = group.puns[index];

          if (group.type === 'totalTrash') {
            var amount = 0;
            var reply = group.catch;
          } else {
            var amount = crypto.randomInt(group.min, group.max + 1);
            var reply = group.catch.replace('{amount}', amount.toString());
          }

          var newTotal = await prisma.fishy.update({
            where: {
              userId: target.userId,
            },
            data: {
              totalFish: target.totalFish + amount,
              timesFished: target.timesFished + 1,
              [group.type]: target[group.type as FishyStat] + 1,
            },
          });

          const time = new Date();
          if (gift === true) {
            await prisma.fishy.update({
              where: {
                userId: ogAuthor.userId,
              },
              data: {
                totalFishGifted: ogAuthor.totalFishGifted + amount,
                timesFished: ogAuthor.timesFished + 1,
                lastFish: time.toISOString(),
              },
            });
          } else {
            await prisma.fishy.update({
              where: {
                userId: target.userId,
              },
              data: {
                lastFish: time.toISOString(),
              },
            });
          }

          if (amount > target.biggestFish || target.biggestFish === 0) {
            await prisma.fishy.update({
              where: {
                userId: target.userId,
              },
              data: {
                biggestFish: amount,
              },
            });
          }

          const embed = new MessageEmbed({
            title: reply,
            color: colour,
            fields: [
              {
                name: 'Mr. Fish says...',
                value: `> ${fishPun}`,
              },
            ],
            footer: {
              text: `${user.tag} has ${newTotal.totalFish} fishy`,
              iconURL: user.displayAvatarURL({ dynamic: true }),
            },
          });
          await message.channel.send(embed.setTimestamp()).then((msg) => msg.react(group.reaction));
          return message;
        } else {
          const timerEmbed = createDefaultEmbed(title, description, color, author);
          message.channel.send(timerEmbed);
        }
      }
    }
  }
}
