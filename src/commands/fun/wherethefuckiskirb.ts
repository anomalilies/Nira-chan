import { MessageEmbed } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import axios from 'axios';
import moment from 'moment';

let cooldown = false;
const timestamp = Date.now();

export default class KirbTrackerCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'wherethefuckiskirb',
      group: 'fun',
      memberName: 'wherethefuckiskirb',
      description: `WHERE IS HE?`,
      guildOnly: true,
    });
  }

  async run(message: CommandoMessage) {
    if (cooldown == false) {
      cooldown = true;

      axios
        .get('https://ais.spire.com/messages?fields=decoded&mmsi=mmsi=431006749', { headers: { Authorization: 'Bearer ' + "move to env file" }})//'https://data.aishub.net/ws.php?username=USERNAME&format=1&output=json&imo=9756688'
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .then(async (res: any) => {
          console.log(res.data.name, res.data.mmsi)
          //const embed = new MessageEmbed({
            //title: `No Kirb, Just the Almighty Loaf`,
            //thumbnail: { url: 'https://cdn.discordapp.com/emojis/816811190034235423.png' },
            //description: res.data,
            //color: '#F1D8F7',
          })
          //return await message.channel.send(embed);
        //})
        .catch((err: string) => {
          console.error(err);
        });

      setTimeout(() => {
        cooldown = false;
      }, 2000);
    } else {
      const embed = new MessageEmbed({
        title: `Patience is a Virtue, You Know?`,
        description:
          '> **Please wait ' +
          moment.duration(timestamp + 8640000 - Date.now(), 'milliseconds').humanize() +
          '!**\n To prevent API abuse, this command is on global cooldown.',
        thumbnail: { url: 'https://cdn.discordapp.com/emojis/766865951458721844.gif' },
        color: '#F1D8F7',
      });

      message.channel.send(embed.setTimestamp());
    }
    return message;
  }
}
