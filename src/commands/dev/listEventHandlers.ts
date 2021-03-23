import { MessageEmbed } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';

import handlers from '../../config/event_handler.json';
import { keyv } from '../../database/keyv';
import { hasRole } from '../../util/checks';
import { roles } from '../../config/config.json';

export default class ListEventHandlersCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'list',
      group: 'dev',
      memberName: 'list',
      description: 'Displays all event handlers.',
      guildOnly: true,
    });
  }

  async run(msg: CommandoMessage) {
    if (!hasRole(roles.niraDev, msg) && !hasRole(roles.moderators, msg)) {
      return msg.say('You need to be a Nira-chan developer or Moderator to use this command!');
    }

    let allEvents = '';

    for (const key of Object.keys(handlers)) {
      allEvents += `\`${key}\`: ${await keyv.get(key)}\n`;
    }

    const embed = new MessageEmbed({
      title: 'All Event Handlers',
      description: allEvents,
    });

    return msg.say(embed);
  }
}
