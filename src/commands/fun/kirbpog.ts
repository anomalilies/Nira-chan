import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';

import { emojis } from '../../config/config.json';

export default class KirbpogCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'kirbpog',
      group: 'fun',
      memberName: 'kirbpog',
      description: 'Poggers.',
    });
  }

  async run(message: CommandoMessage) {
    return await message.channel.send(
      `${emojis.kirbsucc} <:poggers:764300262290358282>\n<:kirbful:757290594618966146>\n<:kirbpog:764299282664521729>`,
    );
  }
}
