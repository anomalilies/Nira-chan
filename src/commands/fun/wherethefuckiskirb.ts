/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import { MessageAttachment, MessageEmbed } from 'discord.js';
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
    });
  }

  async run(message: CommandoMessage) {
    if (cooldown == true) {
      const embed = new MessageEmbed({
        title: `Kirb Your Enthusiasm`,
        description:
          '> **Please wait ' +
          moment.duration(timestamp + 30000 - Date.now(), 'milliseconds').humanize() +
          '!**\n To prevent API abuse, this command is on global cooldown.',
        thumbnail: {
          url: 'https://cdn.discordapp.com/emojis/766865951458721844.gif',
        },
        color: '#F1D8F7',
      });

      return message.channel.send(embed.setTimestamp());
    }
    cooldown = true;
    try {
      const res = await axios.get<any>('https://www.marinetraffic.com/vesselDetails/latestPosition/shipid:3521181', {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; rv:78.0) Gecko/20100101 Firefox/78.0',
          Accept: '*/*',
          'Accept-Language': 'en-US,en;q=0.5',
          Referer:
            'https://www.marinetraffic.com/en/ais/details/ships/shipid:3521181/mmsi:431006749/imo:9756688/vessel:DAISHIN_MARU_NO_10119',
          'X-Requested-With': 'XMLHttpRequest',
        },
      });
      var lat = res.data.lat;
      var lon = res.data.lon;

      var embed = new MessageEmbed({
        title: `Kirb Identification Radar Bot`,
        description:
          `Kirb was last reported to be in **${
            res.data.areaCode
          }** :flag_${res.data.arrivalPort.countryCode.toLowerCase()}:\n(${res.data.areaName}) at **` +
          moment.unix(res.data.lastPos).format('HH:mm:ss') +
          ' UTC** on ' +
          moment.unix(res.data.lastPos).format('DD/MM/YY') +
          `.\n> [Current Location](https://www.google.com/maps/search/${lat},+${lon})`,
        thumbnail: {
          url: 'https://cdn.discordapp.com/emojis/762940802392653864.gif',
        },
        fields: [
          {
            name: `Current Port`,
            value: res.data.currentPortName.replace(
              /(^\w|\s\w)(\S*)/g,
              (_: string, m1: string, m2: string) => m1.toUpperCase() + m2.toLowerCase(),
            ),
            inline: true,
          },
          {
            name: `Ship Status`,
            value: res.data.shipStatus,
            inline: true,
          },
          {
            name: `Speed`,
            value: `${res.data.speed} knots`,
            inline: true,
          },
        ],
        color: '#F1D8F7',
      });
      setTimeout(() => {
        cooldown = false;
      }, 30000);
    } catch (err) {
      console.log(err);
    }
    try {
      axios({
        method: 'get',
        url: `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&center=lonlat:${lon},${lat}&zoom=15&marker=lonlat:${lon},${lat};type:awesome;color:%23fc7c93;strokecolor:%23ffffff;size:large;whitecircle:no&scaleFactor=2&apiKey=${process.env.GEOAPIFY_KEY}`,
        responseType: 'stream',
      }).then(function (response) {
        embed.attachFiles([new MessageAttachment(response.data, 'map.png')]).setImage('attachment://map.png');
        message.channel.send(embed.setTimestamp());
      });
    } catch (err) {
      console.log(err);
    }
    return message;
  }
}
