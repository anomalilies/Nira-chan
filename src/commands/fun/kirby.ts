import { MessageEmbed } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';

import { allowLists, homeGuild, roles } from '../../config/config.json';
import abilities from '../../data/copyabilities.json';

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
    if (
      message.channel.type === 'dm' ||
      allowLists.botSpamChannel.includes(message.channel.id) ||
      message.guild.id !== homeGuild ||
      message.member.roles.cache.get(roles.botPass)
    ) {
      const abilityGroup: string[] = [];
      const weights: number[] = [];

      for (const [, value] of Object.entries(abilities)) {
        abilityGroup.push(...value.ability);
        weights.push(value.weight);
      }

      let i: number;

      for (i = 0; i < weights.length; i++) {
        weights[i] += weights[i - 1] || 0;
      }

      const random = Math.random() * weights[weights.length - 1];

      for (i = 0; i < weights.length; i++) {
        if (weights[i] > random) {
          break;
        }
      }

      const ability = abilityGroup[i];
      const index = Math.floor(Math.random() * ability.length);

      let nickname: string;

      if (message.channel.type === 'dm') {
        nickname = message.author.username;
      } else {
        nickname = message.guild.member(message.author).displayName;
      }

      const replies = [
        `Kirby inhaled **${nickname}** and got the **${ability[index]}** ability!`,
        `Somehow, when Kirby inhaled **${nickname}**, he got the **${ability[index]}** ability!`,
        `Elemental combo! Kirby got the **${ability[index]}** ability when inhaling **${nickname}**!`,
        `Power combo! Kirby got the **${ability[index]}** ability when inhaling **${nickname}**!`,
        `Woah! Kirby got the **${ability[index]}** super ability when inhaling **${nickname}**!`,
        `Kirby inhaled **${nickname}** and... Turned into yarn? He uses the **${ability[index]}** move!`,
        `Kirby found a Robobot Armour docking station! After inhaling **${nickname}**, he uses **${ability[index]}**!`,
        `With **${nickname}**, Kirby partners up with his friends! He uses the **${ability[index]}** attack!`,
        `Wow! Kirby inhaled **${nickname}** and got the rare **${ability[index]}** ability!`,
        `Kirby inhaled **${nickname}** and... Turned into yarn? He gains the **${ability[index]}** ability!`,
        `As Kirby is approaching an impending boss fight, anxiety creeps over him. No need to worry, though; Kirby inhales **${nickname}**, and gets the **${ability[index]}** ability!`,
        `No way... Kirby inhaled **${nickname}** and got the ultra-rare **${ability[index]}** ability!`,
        `why tf would i absorb your **${ability}**, **${nickname}**? <:kirbuff:757349479065321483> fuck outta here fam`,
      ];

      const embed = new MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        .setColor(15849719)
        .setDescription(`<:kirbsucc:757289104789471322> ${replies[i]}`);

      return await message.channel.send(embed);
    }
  }
}
