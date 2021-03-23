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
    // 15 results on each embed 'page', title = guildname :fish: leaderboard, replace #1-3 with medal emojis, if user has fished before put their place in the footer (avatar, name is #${} in the fishy league | 1/?)

    const guild = message.guild;
    const users = await prisma.fishy.findMany({
      orderBy: {
        totalFish: 'desc',
      },
    });

    let i: number;
    var guildUsers = [];

    for (i = 0; i < users.length; i++) {
      const findUser = guild.members.cache.get(users[i].userId);
      if (findUser !== undefined) {
        guildUsers.push(`**${findUser.user.username} — ${users[i].totalFish}** fishy`);
      }
    }
    if (isDmChannel(message) || isInChannel(message, allChannels.fishy) || /*!*/ isHomeGuild(message)) {
      for (i = 1; i < guildUsers.length; i++) {
        console.log('`#' + i + '` ' + guildUsers[i]);
      }
    }
    return message;
  }
}
