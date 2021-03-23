import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';

import { roles } from '../../config/config.json';
import handlers from '../../config/event_handler.json';
import { keyv } from '../../database/keyv';
import { hasRole } from '../../util/checks';

type PromptArgs = {
  name: string;
};

export default class ToggleEventCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'toggle',
      group: 'dev',
      memberName: 'toggle',
      description: 'Toggle an event handler on/off.',
      args: [
        {
          key: 'name',
          prompt: 'What is the event handler name?',
          type: 'string',
        },
      ],
      guildOnly: true,
    });
  }

  async run(msg: CommandoMessage, { name }: PromptArgs) {
    if (!hasRole(roles.niraDev, msg) && !hasRole(roles.moderators, msg)) {
      return msg.say('You need to be a Nira-chan developer or Moderator to use this command!');
    }

    if (!Object.keys(handlers).includes(name)) {
      return msg.say(`Could not find event handler ${name}!`);
    }

    const oldValue = await keyv.get(name);

    await keyv.set(name, !oldValue);

    return msg.say(`Toggled event handler \`${name}\` from \`${oldValue}\` to \`${!oldValue}\``);
  }
}
