import { CommandoClient } from 'discord.js-commando';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const eMap = new Map();

export const updateMap = async (client: CommandoClient) => {
  client.guilds.cache.forEach(async (guild) => {
    const target = await prisma.auth.findUnique({
      where: {
        guildId: guild.id,
      },
    });

    if (target.authentication) {
      guild.emojis.cache
        .filter((e) => e.available)
        .forEach((e) => {
          eMap.set(<string>e.name.toLowerCase(), e);
        });
    }
  });
};

export function emojiMap() {
  return eMap;
}
