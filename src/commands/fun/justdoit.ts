import { MessageEmbed } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';

export default class JustDoItCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'justdoit',
      aliases: ['doit', 'shia', 'shialabeouf'],
      group: 'fun',
      memberName: 'justdoit',
      description: 'DO IT! JUST DO IT!',
    });
  }

  async run(message: CommandoMessage) {
    const embed = new MessageEmbed()
      .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
      .setDescription(
        "Do it\nJust do it\nDon't let your dreams be dreams\nYesterday you said tomorrow\nSo just do it\nMake your dreams come true\nJust do it\nSome people dream of success\nWhile you're gonna wake up and work hard at it\nNothing is impossible\nYou should get to the point\nWhere anyone else would quit\nAnd you're not going to stop there\nNo, what are you waiting for?\nDo it\nJust do it\nYes you can\nJust do it\nIf you're tired of starting over\nStop giving up",
      )
      .setColor(15849719);

    return await message.channel.send(embed);
  }
}
