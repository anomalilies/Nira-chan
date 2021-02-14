import { MessageEmbed } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';

import { homeguild } from '../../config/config.json';

export default class SayCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: '0',
      group: 'misc',
      memberName: '0',
      description: 'Provide another user with some much-welcome encouragement!',
      guildOnly: true,
    });
  }

  async run(msg: CommandoMessage) {
    if (msg.guild.id === homeguild) {
      const rule0 = new MessageEmbed()
        .setTitle('(Secret Rule) 0. Be Kind to Yourself')
        .setDescription(
          'We care for you, so stop beating yourself up!\nNot everything is your fault, so please keep trusting' +
            ' yourself, and our respect and love for you.',
        );
      return msg.channel.send(rule0);
    }
  }
}
