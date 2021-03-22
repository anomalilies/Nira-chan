/* eslint-disable no-var */
import { MessageEmbed } from 'discord.js';
import { PrismaClient } from '@prisma/client';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import { isInChannel, isDmChannel, isHomeGuild } from '../../util/checks';
import { allChannels } from '../../config/config.json';

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
      group: 'fun',
      memberName: 'fishy',
      description: 'Go fish!',
      args: [
        {
          key: 'name',
          prompt: 'Who would you like to fish for?',
          type: 'string',
          default: '',
          validate: (name: string) => {
            if (name.match(/(^<@!\d{18}>$)/)) return true;
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
      var userID = Object.values(name)
        .toString()
        .replace(/[<@!>]/g, '');
      gift = true;
    }
    const user = this.client.users.cache.find((u) => u.id === userID);

    const userLimit = await prisma.fishy.findUnique({
      where: { id: 10000 },
    });
    if (userLimit === null && user !== undefined) {
      const target = await prisma.fishy.findUnique({
        where: {
          userId: user.id,
        },
      });
      if (target === null) {
        await prisma.fishy.create({
          data: { userId: user.id },
        });
      }
      let canFish = false;

      setTimeout(async () => {
        if (gift === true) {
          var ogAuthor = await prisma.fishy.findUnique({
            where: {
              userId: message.author.id,
            },
          });
          if (ogAuthor === null) {
            await prisma.fishy.create({
              data: { userId: message.author.id },
            });
          }

          if (Date.now() >= ogAuthor.lastFish.getTime() + 720 /*0000*/) {
            canFish = true;
          }
        } else if (Date.now() >= target.lastFish.getTime() + 720 /*0000*/) {
          canFish = true;
        }
        message.channel.startTyping();

        if (
          canFish === true &&
          (isDmChannel(message) || isInChannel(message, allChannels.fishy) || /*!*/ isHomeGuild(message))
        ) {
          const total = fish.reduce((acc, cur) => acc + cur.weight, 0);
          const threshold = Math.random() * total;

          let sum = 0;
          const group = fish.find((group) => {
            sum += group.weight;
            return sum >= threshold;
          });

          const index = Math.floor(Math.random() * group.puns.length);
          const fishPun = group.puns[index];

          if (group.type === 'totalTrash') {
            var amount = 0;
            var reply = group.catch;
          } else {
            var amount = Math.floor(Math.random() * (group.max - group.min) + group.min);
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

          if (gift === true) {
            await prisma.fishy.update({
              where: {
                userId: ogAuthor.userId,
              },
              data: {
                totalFishGifted: ogAuthor.totalFishGifted + amount,
                timesFished: ogAuthor.timesFished + 1,
              },
            });
          }
          if (amount > target.biggestFish || target.biggestFish === null) {
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
            color: '#F1D8F7',
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
          return await message.channel.send(embed.setTimestamp());
        } else {
          message.channel.send('fishy timer goes here...');
        }
      }, 1000);
      message.channel.stopTyping();
      return message;
    } else {
      message.channel.send('anna oop sksksksk i made a wHoOPSIE!! >.<');
    }
  }
}
