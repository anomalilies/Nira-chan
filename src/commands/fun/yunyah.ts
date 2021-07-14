import { MessageEmbed, TextChannel } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';

import { doesUserHaveBotpass, isBotspamChannel, isDmChannel, isHomeGuild } from '../../util/checks';
import yunyahQuotes from '../../data/yunyah.json';
import { colour } from '../../config/config.json';

export default class YunyahCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'yunyah',
      group: 'fun',
      memberName: 'yunyah',
      description: `Is ACA NEE?`,
    });
  }

  async run(message: CommandoMessage) {
    const quote = yunyahQuotes[Math.floor(Math.random() * yunyahQuotes.length)];

    if (isDmChannel(message)) {
      const embed = new MessageEmbed({
        author: { name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) },
        description: quote,
        color: colour,
      });
      await message.channel.send(embed);
    } else if (isBotspamChannel(message) || !isHomeGuild(message) || doesUserHaveBotpass(message)) {
      const webhooks = await (<TextChannel>message.channel).fetchWebhooks();
      let webhook = webhooks.first();

      if (!webhook) {
        webhook = await (<TextChannel>message.channel).createWebhook('Nira-chan');
      }
      message.delete();

      await webhook.send(quote, {
        username: 'yunyah',
      });
    }
    return message;
  }
}
