import { MessageEmbed, MessageReaction, User } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';

import { doesUserHaveBotpass, isBotspamChannel, isDmChannel } from '../../util/checks';

const yes = '✅';
const no = '❎';

export default class AkinatorCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'akinator',
      aliases: ['acanetor', 'acaねtor'],
      group: 'fun',
      memberName: 'akinator',
      description: 'Akinator... But with ACAね for once!',
    });
  }

  async run(message: CommandoMessage) {
    if (isDmChannel(message) || isBotspamChannel(message) || doesUserHaveBotpass(message)) {
      const percentChance = Math.floor(Math.random() * (99 - 75 + 1) + 75);

      const questionEmbed = new MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`I'm ${percentChance}% sure your character is...\n\nACAね (Singer)`)
        .setFooter(`Is this correct? (${yes}/${no})`)
        .setThumbnail('https://raw.githubusercontent.com/anomalilies/Nira-chan/master/Images/ACAne.png');

      const msg = await message.channel.send(questionEmbed);
      await msg.react(yes);
      await msg.react(no);

      const filter = (r: MessageReaction, u: User) => u.id === message.author.id && [yes, no].includes(r.emoji.name);
      const reactions = await msg.awaitReactions(filter, {
        max: 1,
        time: 30 * 1000,
      });

      if (msg.channel.type !== 'dm') {
        await msg.reactions.removeAll();
      }

      if (reactions.has(yes)) {
        const correctEmbed = new MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
          .setDescription('Great! I guessed correctly. I love playing with you!')
          .setColor(6732650);

        await msg.edit(correctEmbed);
      } else if (reactions.has(no)) {
        const dimeloEmbed = new MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
          .setDescription("I'm 100% sure your character is...\n\nDimelo Tony (Musician)")
          .setFooter('You have no choice in the matter; This is correct.')
          .setThumbnail('https://raw.githubusercontent.com/anomalilies/Nira-chan/master/Images/Dimelo%20Tony.jpg');

        await msg.edit(dimeloEmbed);
      }
    }

    return message;
  }
}
