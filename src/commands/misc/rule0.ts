import { MessageEmbed } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';

import { homeGuild, prefix } from '../../config/config.json';

export default class Rule0Command extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: '0',
      group: 'misc',
      aliases: ['0w0'],
      memberName: '0',
      description: 'Provide another user with some much-welcome encouragement!',
      guildOnly: true,
    });
  }

  async run(msg: CommandoMessage) {
    if (msg.guild.id === homeGuild) {
      const rule0 = new MessageEmbed({
        color: '#F1D8F7',
      });

      if (msg.content.toLowerCase() === `${prefix}0w0`) {
        rule0.setTitle('(Swecrwet Rwulwe) 0w0. Bwe Kwind to Youwsewf');
        rule0.setDescription(`We cawe fow ywou, so stwop byeatwing youwsewf up!
        Nyot evewything is youw fauwt, so pwease keep twusting youwsewf, and ouw wespect and wuv fow you.`);
      } else {
        rule0.setTitle('(Secret Rule) 0. Be Kind to Yourself');
        rule0.setDescription(`We care for you, so stop beating yourself up!
        Not everything is your fault, so please keep trusting yourself, and our respect and love for you.`);
      }
      return msg.channel.send(rule0);
    }
  }
}
