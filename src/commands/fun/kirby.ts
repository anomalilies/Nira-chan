import { MessageEmbed } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';

import abilities from '../../data/copyabilities.json';
import { doesUserHaveBotpass, isBotspamChannel, isDmChannel, isHomeGuild } from '../../util/checks';

interface Ability {
  keyName: string;
  names: string[];
}

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
      let ability: Ability;
      let total = 0;

      for (const [, ability] of Object.entries(abilities)) {
        total += ability.weight;
      }

      const threshold = Math.random() * total;

      total = 0;

      for (const [key, value] of Object.entries(abilities)) {
        total += value.weight;

        if (total >= threshold) {
          ability = {
            keyName: key,
            names: value.names,
          };
          break;
        }
      }

      const index = Math.floor(Math.random() * ability.names.length);

      let nickname = message.author.username;

      if (!isDmChannel(message)) {
        nickname = message.guild.member(message.author).displayName;
      }

      const replies = [
        `Kirby inhaled **${nickname}** and got the **${ability.names[index]}** ability!`,
        `Somehow, when Kirby inhaled **${nickname}**, he got the **${ability.names[index]}** ability!`,
        `Elemental combo! Kirby got the **${ability.names[index]}** ability when inhaling **${nickname}**!`,
        `Power combo! Kirby got the **${ability.names[index]}** ability when inhaling **${nickname}**!`,
        `Woah! Kirby got the **${ability.names[index]}** super ability when inhaling **${nickname}**!`,
        `Kirby inhaled **${nickname}** and... Turned into yarn? He uses the **${ability.names[index]}** move!`,
        `Kirby found a Robobot Armour docking station! After inhaling **${nickname}**, he uses **${ability.names[index]}**!`,
        `With **${nickname}**, Kirby partners up with his friends! He uses the **${ability.names[index]}** attack!`,
        `Wow! Kirby inhaled **${nickname}** and got the rare **${ability.names[index]}** ability!`,
        `Kirby inhaled **${nickname}** and... Turned into yarn? He gains the **${ability.names[index]}** ability!`,
        `As Kirby is approaching an impending boss fight, anxiety creeps over him. No need to worry, though; Kirby inhales **${nickname}**, and gets the **${ability.names[index]}** ability!`,
        `No way... Kirby inhaled **${nickname}** and got the ultra-rare **${ability.names[index]}** ability!`,
        `why tf would i absorb your **${ability.keyName}**, **${nickname}**? <:kirbuff:757349479065321483> fuck outta here fam`,
      ];

      const embed = new MessageEmbed({
        author: { name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) },
        color: '#F1D8F7',
        description: `<:kirbsucc:757289104789471322> ${replies[Math.floor(Math.random() * replies.length)]}`,
      });

      return await message.channel.send(embed);
    }
  }
}
