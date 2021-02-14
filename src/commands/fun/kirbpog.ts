import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';

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
      '<:kirbsucc:757289104789471322> <:poggers:764300262290358282>\n<:kirbful:757290594618966146>\n<:kirbpog:764299282664521729>',
    );
  }
}
