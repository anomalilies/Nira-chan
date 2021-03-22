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
      const ogAuthor = await prisma.fishy.findUnique({
        where: {
          userId: message.author.id,
        },
      });

      if ((target || ogAuthor) === null) {
        const loop = [
          { property: target, id: user.id },
          { property: ogAuthor, id: message.author.id },
        ];
        for (const key in loop) {
          if (loop[key].property === null) {
            await prisma.fishy.create({
              data: { userId: loop[key].id },
            });
            console.log(`Added ${user.username} to database!`);
          }
        }
      }

      let canFish = false;
      if (gift === true && (ogAuthor.lastFish === null || Date.now() >= ogAuthor.lastFish.getTime() + 720) /*0000*/) {
        canFish = true;
      } else if (
        gift === false &&
        (target.lastFish === null || Date.now() >= target.lastFish.getTime() + 720) /*0000*/
      ) {
        canFish = true;
      }

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
          var reply = group.catch;
          var amount = 0;
        } else {
          var amount = Math.floor(Math.random() * (group.max - group.min) + group.min);
          var reply = group.catch.replace('{amount}', amount.toString());

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
          var newTotal = await prisma.fishy.update({
            where: {
              userId: target.userId,
            },
            data: {
              totalFish: target.totalFish + amount,
              timesFished: target.timesFished + 1,
              [group.type]: target.[group.type] + amount,
            },
          });

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
        }
      } else {
        message.channel.send('fishy timer goes here...');
      }
    } else {
      message.channel.send('anna oop sksksksk i made a wHoOPSIE!! >.<');
    }
  }
}
