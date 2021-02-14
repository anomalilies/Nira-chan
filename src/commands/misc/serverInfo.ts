import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';

import serverInfoEmbed from '../../embeds/serverInfoEmbed';

export default class ServerInfoCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'serverinfo',
      aliases: ['about'],
      group: 'misc',
      memberName: 'about',
      description: "Find out about the server you're in.",
      guildOnly: true,
    });
  }

  async run(msg: CommandoMessage) {
    return msg.channel.send(serverInfoEmbed(msg.guild));
  }
}
