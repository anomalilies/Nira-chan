import { MessageEmbed, MessageReaction, User } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';

import { allowLists, roles } from '../../config/config.json';

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

  createSimpleEmbed(author: User, desc: string, footer: string, thumbnail: string) {
    return new MessageEmbed()
      .setAuthor(author.tag, author.displayAvatarURL({ dynamic: true }))
      .setColor(240116)
      .setDescription(desc)
      .setFooter(footer)
      .setThumbnail(thumbnail);
  }

  async run(message: CommandoMessage) {
    if (
      message.channel.type === 'dm' ||
      allowLists.botSpamChannel.includes(message.channel.id) ||
      message.member.roles.cache.get(roles.botPass)
    ) {
      const random = Math.floor(Math.random() * (99 - 75 + 1) + 75);

      const ACAneEmbed = this.createSimpleEmbed(
        message.author,
        `I'm ${random}% sure your character is...\n\nACAね (Singer)`,
        `Is this correct? (${yes}/${no})`,
        'https://raw.githubusercontent.com/anomalilies/Nira-chan/master/Images/ACAne.png',
      );
      const dimeloEmbed = this.createSimpleEmbed(
        message.author,
        "I'm 100% sure your character is...\n\nDimelo Tony (Musician)",
        'You have no choice in the matter; This is correct.',
        'https://raw.githubusercontent.com/anomalilies/Nira-chan/master/Images/Dimelo%20Tony.jpg',
      );
      const correctEmbed = new MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription('Great! I guessed correctly. I love playing with you!')
        .setColor(6732650);

      const msg = await message.channel.send(ACAneEmbed);
      await msg.react(yes);
      await msg.react(no);

      const filter = (r: MessageReaction, u: User) => [yes, no].includes(r.emoji.name) && u.id === message.author.id;
      const reactions = await msg.awaitReactions(filter, {
        max: 1,
        time: 30000,
      });

      if (msg.channel.type !== 'dm') {
        await msg.reactions.removeAll();
      }

      if (reactions.has(yes)) {
        await msg.edit(correctEmbed);
      } else if (reactions.has(no)) {
        await msg.edit(dimeloEmbed);
      }

      return message;
    }
  }
}
