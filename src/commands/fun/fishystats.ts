/* eslint-disable no-var */
import { MessageEmbed } from 'discord.js';
import { PrismaClient } from '@prisma/client';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import { isInChannel, isDmChannel, isHomeGuild } from '../../util/checks';
import { allChannels } from '../../config/config.json';

const prisma = new PrismaClient();

interface PromptArgs {
  name: string;
}

export default class FishyStatsCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'fishystats',
      aliases: ['fs'],
      group: 'fun',
      memberName: 'fishystats',
      description: 'Check out your fishing statistics!',
      args: [
        {
          key: 'name',
          prompt: 'Who would you like to check the stats of?',
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
    if (name === '') {
      var userID = message.author.id;
    } else {
      var userID = Object.values(name)
        .toString()
        .replace(/[<@!>]/g, '');
    }
    const user = this.client.users.cache.find((u) => u.id === userID);

    if (user !== undefined) {
      const target = await prisma.fishy.findUnique({
        where: {
          userId: user.id,
        },
      });
      if (target === null) {
        console.log("There's nothing to see here, but at least there's plenty more fish in the sea!");
      } else if (isDmChannel(message) || isInChannel(message, allChannels.fishy) || /*!*/ isHomeGuild(message)) {
        const averageFish = target.totalFish / target.timesFished;
        const embed = new MessageEmbed({
          title: 'Fishy Stats 🎣',
          color: '#F1D8F7',
          description: `Fishy owned: **${target.totalFish}**\nFishy gifted: **${
            target.totalFishGifted
          }**\nTimes fished: **${target.timesFished}**\nBiggest fish: **${
            target.biggestFish
          }**\nAverage fish: **${averageFish.toFixed(2)}**`,
          fields: [
            {
              name: 'Rarity Breakdown',
              value: `Trash: **${target.totalTrash}** ()%\nCommon: **${target.totalCommon}** ()%\nUncommon: **${target.totalUncommon}** ()%\nRare: **${target.totalRare}** ()%\nLegendary: **${target.totalLegendary}** ()%`,
            },
          ],
          footer: {
            text: user.tag,
            iconURL: user.displayAvatarURL({ dynamic: true }),
          },
        });
        return await message.channel.send(embed.setTimestamp());
      }
    } else {
      message.channel.send('anna oop sksksksk i made a wHoOPSIE!! >.<');
    }
  }
}
