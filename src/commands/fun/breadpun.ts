import { MessageEmbed } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import axios from 'axios';

import { colour } from '../../config/config.json';

export default class BreadPunCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'breadpun',
      group: 'fun',
      memberName: 'breadpun',
      description: `Are you... Bready?`,
    });
  }

  async run(message: CommandoMessage) {
    axios
      .get('https://my-bao-server.herokuapp.com/api/breadpuns')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then(async (res: any) => {
        const embed = new MessageEmbed({
          title: `The Almighty Loaf says...`,
          thumbnail: { url: 'https://cdn.discordapp.com/emojis/816811190034235423.png' },
          description: res.data,
          color: colour,
        });
        return await message.channel.send(embed);
      })
      .catch((err: string) => {
        console.error(err);
      });
    return message;
  }
}
