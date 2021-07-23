import { MessageEmbed } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import { colour, members } from '../../config/config.json';

export default class ContactCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'contact',
      aliases: ['support'],
      group: 'misc',
      memberName: 'contact',
      description: 'Get support in using Nira, and suggest new features.',
    });
  }

  async run(message: CommandoMessage) {
    const embed = new MessageEmbed({
      title: `Support`,
      color: colour,
      description: `Need support in using <@!${this.client.user.id}>?\nContact <@!${members.currentOwner}> through DMs, or **through the support server found below**.`,
      fields: [
        {
          name: 'Discord Server',
          value: `[Link](https://discord.gg/htSDkHH)`,
        },
      ],
      author: { name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) },
      thumbnail: { url: 'https://raw.githubusercontent.com/anomalilies/Nira-chan/master/Images/Nira.png' },
    });

    return await message.channel.send(embed);
  }
}
