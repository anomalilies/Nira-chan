import { MessageEmbed } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';

import { homeGuild } from '../../config/config.json';

export default class SayCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: '0w0',
      group: 'misc',
      memberName: '0w0',
      description: 'P-Pwovide anyothew usew with some much-wewcome encouwagement! -( ﾟ▽ﾟ)/ ',
      guildOnly: true,
    });
  }

  async run(msg: CommandoMessage) {
    if (msg.guild.id === homeGuild) {
      const rule0w0 = new MessageEmbed()
        .setTitle('(Swecrwet Rwulwe) 0w0. Bwe Kwind to Youwsewf')
        .setDescription(
          'We cawe fow ywou, so stwop byeatwing youwsewf up. (・`ω´・)\nNyot evewything is youw fauwt, so ' +
            'pwease keep twusting youwsewf, and ouw wespect and wuv fow you.',
        );
      return msg.channel.send(rule0w0);
    }
  }
}
