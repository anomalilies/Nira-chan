import { MessageEmbed } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import axios from 'axios';
let cooldown = false;

export default class KirbTrackerCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'wherethefuckiskirb',
      group: 'fun',
      memberName: 'wherethefuckiskirb',
      description: `WHERE IS HE?`,
    });
  }

  async run(message: CommandoMessage) {
    if (cooldown == false) {
      cooldown = true;

      axios
        .get('https://my-bao-server.herokuapp.com/api/breadpuns') //'https://data.aishub.net/ws.php?username=USERNAME&format=1&output=json&imo=9756688'
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .then(async (res: any) => {
          const embed = new MessageEmbed({
            title: `KirbEx`,
            thumbnail: { url: 'https://cdn.discordapp.com/emojis/816761691986591794.png' },
            description: res.data,
            color: '#F1D8F7',
          });
          return await message.channel.send(embed);
        })
        .catch((err: string) => {
          console.error(err);
        });

      setTimeout(() => {
        cooldown = false;
      }, 90000);
    } else {
      message.channel.send('Please wait to use this command again!');
    }
    return message;
  }
}
