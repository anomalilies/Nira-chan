import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';

interface PromptArgs {
  text: string;
}

export default class SayCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'say',
      aliases: ['echo'],
      group: 'dev',
      memberName: 'say',
      description: 'Say something!',
      args: [
        {
          key: 'text',
          prompt: 'What would you like Nira to say?',
          type: 'string',
        },
      ],
      ownerOnly: true,
    });
  }

  async run(msg: CommandoMessage, { text }: PromptArgs) {
    msg.channel.send(text);
    if (msg.channel.type !== 'dm') {
      msg.delete();
    }

    return msg;
  }
}
