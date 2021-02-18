import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';

import handlers from '../../config/event_handler.json';
import { keyv } from '../../database/keyv';

type PromptArgs = {
  name: string;
};

export default class ToggleEventCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'toggle',
      group: 'moderation',
      memberName: 'toggle',
      description: 'Toggle an event handler on/off',
      args: [
        {
          key: 'name',
          prompt: 'What is the event handler name?',
          type: 'string',
        },
      ],
      ownerOnly: true,
      guildOnly: true,
    });
  }

  async run(msg: CommandoMessage, { name }: PromptArgs) {
    if (!Object.keys(handlers).includes(name)) {
      return msg.say(`Could not find event handler ${name}!`);
    }

    const oldValue = await keyv.get(name);

    await keyv.set(name, !oldValue);

    return msg.say(`Toggled event handler \`${name}\` from \`${oldValue}\` to \`${!oldValue}\``);
  }
}
