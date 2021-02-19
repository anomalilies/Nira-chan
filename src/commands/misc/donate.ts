import { oneLine } from 'common-tags';
import { MessageEmbed } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';

import { isHomeGuild } from '../../util/checks';

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
    if (isHomeGuild(message)) {
      const embed = new MessageEmbed({
        title: `Support ${message.guild.name}`,
        thumbnail: { url: message.guild.iconURL({ dynamic: true }) },
        color: '#F1D8F7',
        fields: [
          {
            name: 'Donations',
            value: oneLine`
              "If you'd like to support the ZONE by finanically funding giveaways,
              **check out our __[Ko-fi](https://ko-fi.com/uniguri)__**!",
            `,
          },
        ],
        footer: { text: 'Thank you!' },
      });

      return await message.channel.send(embed);
    }
  }
}
