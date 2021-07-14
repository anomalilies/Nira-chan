import { stripIndents } from 'common-tags';
import { MessageEmbed } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';

import { colour } from '../../config/config.json';

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
    const embed = new MessageEmbed({
      color: colour,
      author: { name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) },
      description: stripIndents`
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
    });

    return await message.channel.send(embed);
  }
}
