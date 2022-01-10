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
    const guildData = await prisma.auth.findMany();
    const published = new Set(guildData.filter((guild) => guild.authentication).map((guild) => guild.guildId));

    const emojis = this.client.guilds.cache
      .filter((guild) => published.has(guild.id))
      .map((guild) => ({
        guildName: guild.name,
        guildOwner: guild.ownerID,
        emojis: guild.emojis.cache.filter((e) => e.available).map((e) => `${e}`),
      }));

    const promise = Promise.all(emojis.map(guild => this.client.users.fetch(guild.guildOwner)));
    (await promise).forEach((owner, i) => emojis[i].guildOwner = owner.username);

    const data = Buffer.from(JSON.stringify(emojis, null, 2), 'utf8');
    return msg.say(new MessageAttachment(data, 'emoji.json'));
  }
}
