import { MessageEmbed } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';

import abilities from '../../data/copyabilities.json';
import { doesUserHaveBotpass, isBotspamChannel, isDmChannel, isHomeGuild } from '../../util/checks';

export default class KirbyCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'kirby',
      aliases: ['copyability'],
      group: 'fun',
      memberName: 'kirby',
      description: 'What ability would Kirby get if he inhaled you?',
    });
  }

  async run(message: CommandoMessage) {
    if (isDmChannel(message) || isBotspamChannel(message) || !isHomeGuild(message) || doesUserHaveBotpass(message)) {
      const total = abilities.reduce((acc, cur) => acc + cur.weight, 0);
      const threshold = Math.random() * total;

      let sum = 0;
      const group = abilities.find(group => {
        sum += group.weight;
        return sum >= threshold;
      });

      const index = Math.floor(Math.random() * group.abilities.length);
      const ability = group.abilities[index];

      let nickname = message.author.username;
      if (!isDmChannel(message)) {
        nickname = message.member.displayName;
      }

      const reply = group.format.replace("{ability}", ability).replace("{name}", nickname);

      const embed = new MessageEmbed({
        author: { name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) },
        color: '#F1D8F7',
        description: `<:kirbsucc:757289104789471322> ${reply}`,
      });
      return await message.channel.send(embed);
    }
  }
}
