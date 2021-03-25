/* eslint-disable no-var */
import { MessageEmbed, MessageReaction, User } from 'discord.js';
import { PrismaClient } from '@prisma/client';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import { isInChannel, isDmChannel, isHomeGuild } from '../../util/checks';
import { allChannels } from '../../config/config.json';

const prisma = new PrismaClient();

export default class LeaderboardCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'leaderboard',
      aliases: ['fishyleaderboard', 'fishylb', 'lb'],
      group: 'fishy',
      memberName: 'leaderboard',
      description: 'Check out the current leaderboard of fishers.',
    });
  }

  async run(message: CommandoMessage) {
    const guild = message.guild;
    const users = await prisma.fishy.findMany({
      orderBy: {
        totalFish: 'desc',
      },
    });

    let i: number;
    var guildUsers = [];
    var leaderboard: Array<string> = [];

    for (i = 0; i < users.length; i++) {
      const findUser = guild.members.cache.get(users[i].userId);
      if (findUser !== undefined) {
        guildUsers.push(`**${findUser.user.username} — ${users[i].totalFish}** fishy\n`);
      }
    }

    let position: string;
    const medals = ['🥇', '🥈', '🥉'];

    for (i = 1; i < guildUsers.length; i++) {
      if (i <= 3) {
        position = `${medals[i - 1]} `;
      } else {
        position = '`#' + i + '` ';
      }
      leaderboard.push(position + guildUsers[i]);
    }

    if (isDmChannel(message) || isInChannel(message, allChannels.fishy) || !isHomeGuild(message)) {
      const generateEmbed = (index: number) => {
        const currentPage = leaderboard.slice(index, index + 15);
        var embed = new MessageEmbed({
          title: `${guild.name} 🐟 Leaderboard`,
          description: `${currentPage.join('')}`,
          color: '#F1D8F7',
        });
        return embed;
      };

      message.channel.send(generateEmbed(0)).then(async (msg) => {
        if (leaderboard.length <= 15) return;

        msg.react('➡️');
        const collector = msg.createReactionCollector(
          (reaction: MessageReaction, user: User) =>
            ['⬅️', '➡️'].includes(reaction.emoji.name) && user.id === message.author.id,
          { time: 120000 },
        );

        let index = 0;
        collector.on('collect', (reaction: MessageReaction) => {
          msg.reactions.removeAll().then(async () => {
            reaction.emoji.name === '⬅️' ? (index -= 15) : (index += 15);
            msg.edit(generateEmbed(index));

            if (index !== 0) await msg.react('⬅️');
            if (index + 15 < leaderboard.length) await msg.react('➡️');
          });
        });
        collector.on('end', () => {
          msg.reactions.removeAll();
        });
      });
    }
    return message;
  }
}
