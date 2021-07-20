import { MessageAttachment } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default class EmojiListCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'emojilist',
      group: 'misc',
      aliases: ['listemoji'],
      memberName: 'emojilist',
      description: 'List all emoji that Nira can use.',
    });
  }

  async run(msg: CommandoMessage) {
    const target = await prisma.auth.findMany({});
    const guilds = target.filter((guild) => guild.authentication);

    const emojiMap = new Map();

    guilds.forEach(async (g) => {
      const guild = this.client.guilds.cache.get(g.guildId);
      guild.emojis.cache
        .filter((e) => e.available)
        .forEach((e) => {
          emojiMap.set(e.guild.name, {
            guildOwner: e.guild.owner.user.username,
            emojis: guild.emojis.cache.map((e) => `${e}`),
          });
        });
    });

    const data = Buffer.from(JSON.stringify(Array.from(emojiMap.entries()), null, 2), 'utf8');
    return msg.say(new MessageAttachment(data, 'emoji.json'));
  }
}
