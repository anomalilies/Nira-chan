import { stripIndents } from 'common-tags';
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
        stripIndents`
          Do it
          Just do it
          Don't let your dreams be dreams
          Yesterday you said tomorrow
          So just do it
          Make your dreams come true
          Just do it
          Some people dream of success
          While you're gonna wake up and work hard at it
          Nothing is impossible
          You should get to the point
          Where anyone else would quit
          And you're not going to stop there
          No, what are you waiting for?
          Do it
          Just do it
          Yes you can
          Just do it
          If you're tired of starting over
          Stop giving up
        `,
      )
      .setColor('#F1D8F7');

    return await message.channel.send(embed);
  }
}
