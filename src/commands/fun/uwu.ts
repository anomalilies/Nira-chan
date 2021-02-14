import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import { uwuify } from '../../util/uwuTranslator/uwuify';

interface PromptArgs {
  text: string;
}

export default class UwuCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'uwu',
      group: 'fun',
      memberName: 'uwu',
      description: 'UWU-ify your messages!',
      args: [
        {
          key: 'text',
          prompt: 'What text would you like the bot to say?',
          type: 'string',
        },
      ],
    });
  }

  async run(message: CommandoMessage, { text }: PromptArgs) {
    await uwuify(text, message);

    if (message.channel.type !== 'dm') {
      message.delete();
    }

    return message;
  }
}
