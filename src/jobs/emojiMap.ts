import { CommandoClient } from 'discord.js-commando';
import { PrismaClient } from '@prisma/client';

import { commandNames } from '../config/config.json';

const prisma = new PrismaClient();
const eMap = new Map();

export const updateMap = async (client: CommandoClient) => {
  client.guilds.cache.forEach(async (guild) => {
    const target = await prisma.auth.findUnique({
      where: {
        guildId: guild.id,
      },
    });

    const commands = new Set();
    const groups = client.registry.groups;

    commands.add(commandNames.patpatStart.name).add(commandNames.patpatStop.name);
    groups.forEach((grp) => {
      for (const cmd of grp.commands.values()) {
        commands.add(cmd.name);
        cmd.aliases.forEach((a) => {
          commands.add(a);
        });
      }
    });

    if (target.authentication) {
      guild.emojis.cache
        .filter((e) => e.available && !commands.has(e.name))
        .forEach((e) => {
          eMap.set(<string>e.name.toLowerCase(), e);
        });
    }
  });
};

export function emojiMap() {
  return eMap;
}
