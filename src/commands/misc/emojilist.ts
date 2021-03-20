import { MessageAttachment } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';

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
    let emojis = this.client.guilds.cache.map((guild) => ({
      guildName: guild.name,
      emojis: guild.emojis.cache.map((e) => `${e}`),
    }));
    let data = Buffer.from(JSON.stringify(emojis), 'utf8');
    return msg.say(new MessageAttachment(data, 'emoji.json'));
  }
}
