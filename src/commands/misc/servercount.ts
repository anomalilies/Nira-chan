import { MessageEmbed } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';

export default class ServerCountCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'servers',
      aliases: ['servercount'],
      group: 'misc',
      memberName: 'servercount',
      description: 'Check how many servers Nira is in!',
    });
  }

  async run(message: CommandoMessage) {
    const embed = new MessageEmbed({
      author: { name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) },
      title: 'Server Count',
      description: `<@!${this.client.user.id}> currently in **__${this.client.guilds.cache.size} servers__**!`,
      color: '#F1D8F7',
    });

    return await message.channel.send(embed);
  }
}
