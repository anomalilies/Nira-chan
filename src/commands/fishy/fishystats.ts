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
      group: 'fishy',
      memberName: 'fishystats',
      description: 'Check out your fishing statistics.',
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
        .replace(/[\s,<@!>]/g, '');
    }
    const user = this.client.users.cache.find((u) => u.id === userID);

    if (user !== undefined) {
      const target = await prisma.fishy.findUnique({
        where: {
          userId: user.id,
        },
      });

      if (isDmChannel(message) || isInChannel(message, allChannels.fishy) || !isHomeGuild(message)) {
        if (target === null) {
          message.channel.send("There's nothing to see here, but at least there's plenty more fish in the sea!");
        } else {
          const averageFish = target.totalFish / target.timesFished;

          const statTypes = [target.totalFish, target.totalFishGifted, target.timesFished, target.biggestFish];
          const statHeaders = ['Total fishy', 'Fishy gifted', 'Times fished', 'Biggest fish'];
          var statValues = [];
          for (const i in statHeaders) {
            statValues.push(`${statHeaders[i]}: **${statTypes[i]}**`);
          }

          const fishyTotals = [
            target.totalTrash,
            target.totalCommon,
            target.totalUncommon,
            target.totalRare,
            target.totalLegendary,
          ];
          const fishyTypes = ['Trash', 'Common', 'Uncommon', 'Rare', `Legendary`];
          var rarityValues = [];
          for (const i in fishyTypes) {
            rarityValues.push(
              `${fishyTypes[i]}: **${fishyTotals[i]}** (${((fishyTotals[i] / target.timesFished) * 100).toFixed(2)}%)`,
            );
          }

          const fishyStats = statValues.join('\n');
          const rarityStats = rarityValues.join('\n');

          const embed = new MessageEmbed({
            title: 'Fishy Stats 🎣',
            color: '#F1D8F7',
            description: fishyStats + `\nAverage fish: **${averageFish.toFixed(2)}**`,
            fields: [
              {
                name: 'Rarity Breakdown',
                value: rarityStats,
              },
            ],
            footer: {
              text: user.tag,
              iconURL: user.displayAvatarURL({ dynamic: true }),
            },
          });
          return await message.channel.send(embed.setTimestamp());
        }
      }
    }
  }
}
