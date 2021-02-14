import { MessageEmbed } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';

import { homeguild } from '../../config/config.json';

export default class DonateCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'donate',
      aliases: ['support'],
      group: 'misc',
      memberName: 'donate',
      description: 'Support the ZONE!',
    });
  }

  async run(message: CommandoMessage) {
    if (message.guild.id === homeguild) {
      const embed = new MessageEmbed()
        .setTitle(`Support ${message.guild.name}`)
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .addField(
          'Donations',
          "If you'd like to support the ZONE by finanically funding giveaways, **check out our __[Ko-fi](https://ko-fi.com/uniguri)__**!",
        )
        .setColor(15849719)
        .setFooter('Thank you!');
      return message.channel.send(embed);
    }
  }
}
