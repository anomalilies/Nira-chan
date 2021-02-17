import { MessageEmbed } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';

import handlers from '../../config/event_handler.json';
import { keyv } from '../../database/keyv';

export default class ListEventHandlersCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'list',
      group: 'misc',
      memberName: 'list',
      description: 'Displays all event handlers',
      ownerOnly: true,
      guildOnly: true,
    });
  }

  async run(msg: CommandoMessage) {
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
