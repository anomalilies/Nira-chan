import { MessageEmbed } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import { prefix } from '../../config/config.json';

export default class AboutCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'about',
      group: 'misc',
      memberName: 'about',
      description: 'Learn more about Nira-chan.',
    });
  }

  async run(message: CommandoMessage) {
    const embed = new MessageEmbed({
      title: `About ${this.client.user.username}`,
      color: '#F1D8F7',
      description:
        `<@!${this.client.user.id}> is an open-source bot created by **[anomalilies](https://github.com/anomalilies)**.\n> To see a list of Nira's commands, use the ` +
        '`' +
        `${prefix}help` +
        '` command.\n\n **Nira is currently in __' +
        `${this.client.guilds.cache.size} servers__**!`,
      fields: [
        {
          name: 'GitHub Repo',
          value: `[Link](https://github.com/anomalilies/Nira-chan)`,
          inline: true,
        },
        {
          name: 'Discord Server',
          value: `[Link](https://discord.gg/htSDkHH)`,
          inline: true,
        },
        {
          name: 'Ko-fi',
          value: `[Link](https://ko-fi.com/uniguri)`,
          inline: true,
        },
        {
          name: 'Special Thanks',
          value: `Honestly, I can't thank everyone that's helped work on this project with me enough.\nBut, to **Hachan**, **Glup**, **Aravk**, and **Dave**, I wouldn't have gotten to this stage without your support— **I love you all so much**!\n
          Bonus shoutouts to **Elo**, **Kasu**, **Jonno**, and everyone else from ZUTOMAYO ZONE (especially the staff, ~~not because I'll be killed or anything if I don't mention them, nOOO~~)!\n
          And to my wonderful partner, thank you so much for always supporting the passion for my hobbies and dreams — Not only for the future regarding them, but everything else. You mean the world and beyond to me.\n
          **Thank you for everything, everyone. <:niralove:811608668466446356>** You're all amazing!`,
        },
      ],
      thumbnail: { url: 'https://raw.githubusercontent.com/anomalilies/Nira-chan/master/Images/Nira.png' },
    });

    return await message.channel.send(embed);
  }
}
