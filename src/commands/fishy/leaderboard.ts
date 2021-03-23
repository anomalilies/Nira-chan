/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-var */
import { MessageEmbed } from 'discord.js';
import { PrismaClient } from '@prisma/client';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import { isInChannel, isDmChannel, isHomeGuild } from '../../util/checks';
import { allChannels } from '../../config/config.json';

const prisma = new PrismaClient();

export default class LeaderboardCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'leaderboard',
      aliases: ['fishyleaderboard', 'fishylb', 'lb', 'leaderboard fishy'],
      group: 'fishy',
      memberName: 'leaderboard',
      description: 'Check out the current leaderboard of fishers.',
    });
  }

  async run(message: CommandoMessage) {
    // replace #1-3 with medal emojis, if user has fished before put their place in the footer (avatar, name is #${} in the fishy league | 1/?)

    const guild = message.guild;
    const users = await prisma.fishy.findMany({
      orderBy: {
        totalFish: 'desc',
      },
    });

    let i: number;
    var guildUsers: Array<string> = [];

    for (i = 0; i < users.length; i++) {
      const findUser = guild.members.cache.get(users[i].userId);
      if (findUser !== undefined) {
        for (i = 1; i < guildUsers.length; i++) {
          guildUsers.push('`#' + i + '` ' + `**${findUser.user.username} — ${users[i].totalFish}** fishy`);
        }
      }
    }
    console.log(guildUsers);

    if (isDmChannel(message) || isInChannel(message, allChannels.fishy) || /*!*/ isHomeGuild(message)) {
      const generateEmbed = (index: number) => {
        const currentPage = guildUsers.slice(index, index + 15);
        const embed = new MessageEmbed({
          title: `${guild.name} 🐟 Leaderboard`,
          description: `${currentPage}`,
          color: '#F1D8F7',
        });
        return embed;
      };

      message.channel.send(generateEmbed(0)).then((msg) => {
        if (guildUsers.length <= 15) return;

        msg.react('➡️');
        const collector = msg.createReactionCollector(
          (reaction: any, user: any) => ['⬅️', '➡️'].includes(reaction.emoji.name) && user.id === msg.author.id,
          { time: 60000 },
        );

        let index = 0;
        collector.on('collect', (reaction: any) => {
          msg.reactions.removeAll().then(async () => {
            reaction.emoji.name === '⬅️' ? (index -= 15) : (index += 15);
            msg.edit(generateEmbed(index));

            if (index !== 0) await msg.react('⬅️');
            if (index + 15 < guildUsers.length) await msg.react('➡️');
          });
        });
      });
      return message;
    }
  }
}
