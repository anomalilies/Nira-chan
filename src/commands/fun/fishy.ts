/* eslint-disable no-var */
import { MessageEmbed } from 'discord.js';
import { PrismaClient } from '@prisma/client';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import { isInChannel, isDmChannel, isHomeGuild } from '../../util/checks';
import { allChannels, prefix } from '../../config/config.json';

const prisma = new PrismaClient();
import fish from '../../data/fish.json';

export default class FishyCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'fishy',
      aliases: ['fishy', 'fish', 'fihy', 'fisy', 'foshy', 'fisyh', 'fsihy', 'fin'],
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

  async run(message: CommandoMessage, name: string) {
    if (message.content.replace(/\s/g, '') === `${prefix}fishy`) {
      var userID = message.author.id;
    } else {
      var userID = Object.values(name)
        .toString()
        .replace(/[<@!>]/g, '');
    }
    const user = this.client.users.cache.get(userID);

    const userLimit = await prisma.fishy.findUnique({
      where: { id: 10000 },
    });

    if (userLimit === null) {
      const hasFished = await prisma.fishy.findUnique({
        where: {
          userId: user.id,
        },
      });
      const initialFisher = await prisma.fishy.findUnique({
        where: {
          userId: message.author.id,
        },
      });

      const loop = [
        { property: initialFisher, id: message.author.id },
        { property: hasFished, id: user.id },
      ];
      for (const key in loop) {
        if (loop[key].property === null) {
          await prisma.fishy.create({
            data: { userId: loop[key].id },
          });
          console.log(`Added ${user.username} to database!`);
        }
      }

      if (
        (initialFisher.lastFish === null ||
          hasFished.lastFish === null ||
          Date.now() >= initialFisher.lastFish.getTime() + 720/*0000*/) &&
        (isDmChannel(message) || isInChannel(message, allChannels.fishy) || /*!*/isHomeGuild(message))
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

        if (group.catch.startsWith('Caught trash!')) {
          var reply = group.catch;
          var amount = 0;
        } else {
          var amount = Math.floor(Math.random() * (group.max - group.min) + group.min);
          var reply = group.catch.replace('{amount}', amount.toString());

          var newTotal = await prisma.fishy.update({
            where: {
              userId: user.id,
            },
            data: {
              totalFish: hasFished.totalFish + amount,
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
    } else {
      message.channel.send('Database max reached!');
    }
  }
}
