/* eslint-disable no-var */
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import { MessageAttachment, MessageEmbed } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import axios from 'axios';
import moment from 'moment';

import { emojis } from '../../config/config.json';

const COOLDOWN = 30000;
const KIRB_GIVEN = 'https://cdn.discordapp.com/attachments/764936595966918709/825593990589317150/map.png';
let lastRequest = 0;

export default class KirbTrackerCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'wherethefuckiskirb',
      aliases: ['whereishe', 'kirbtracker', 'wherethefuckisntkirb', 'whereisnthe', 'wherethefuckwaskirb', 'wherewashe'],
      group: 'fun',
      memberName: 'wherethefuckiskirb',
      description: 'WHERE IS HE?',
    });
  }

  async run(message: CommandoMessage) {
    const elapsed = Date.now() - lastRequest;
    lastRequest = Date.now();

    if (elapsed < COOLDOWN) {
      const embed = new MessageEmbed({
        title: 'Kirb Your Enthusiasm',
        description:
          '> **Please wait ' +
          moment.duration(COOLDOWN - elapsed).humanize() +
          '!**\n To prevent API abuse, this command is on global cooldown.',
        thumbnail: {
          url: 'https://cdn.discordapp.com/emojis/766865951458721844.gif',
        },
        color: 0xf1d8f7,
      });
      return message.channel.send(embed.setTimestamp());
    }

    const response = await message.channel.send(`Loading... ${emojis.loading}`);

    try {
      const res = await axios.get('https://www.marinetraffic.com/vesselDetails/latestPosition/shipid:5630138', {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; rv:78.0) Gecko/20100101 Firefox/78.0',
          Accept: '*/*',
          'Accept-Language': 'en-US,en;q=0.5',
          Referer:
            'https://www.marinetraffic.com/en/ais/details/ships/shipid:5630138/mmsi:353136000/imo:9811000/vessel:EVER_GIVEN',
          'X-Requested-With': 'XMLHttpRequest',
        },
      });
      var shipData = res.data;
    } catch (err) {
      const embed = new MessageEmbed({
        title: 'Ship API Error',
        description: err.message,
        color: 0xf0534b,
      });
      return response.edit({ content: '', embed });
    }

    const lat = shipData.lat;
    const lon = shipData.lon;
    const stopped = shipData.shipStatus === 'Stopped';

    if (!stopped) {
      try {
        const res = await axios.get(
          `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&center=lonlat:${lon},${lat}&zoom=15&marker=lonlat:${lon},${lat};type:awesome;color:%23fc7c93;strokecolor:%23ffffff;size:large;whitecircle:no&scaleFactor=2&apiKey=${process.env.GEOAPIFY_KEY}`,
          { responseType: 'stream' },
        );
        var mapData = res.data;
      } catch (err) {
        const embed = new MessageEmbed({
          title: 'Map API Error',
          description: err.message,
          color: 0xf0534b,
        });
        return response.edit({ content: '', embed });
      }
    }

    const embed = new MessageEmbed({
      title: 'Kirb Identification Radar Bot',
      description:
        `Kirb was last reported to be in **${
          shipData.areaCode
        }** :flag_${shipData.departurePort.countryCode.toLowerCase()}:\n(${shipData.areaName}) at **` +
        moment.unix(shipData.lastPos).format('HH:mm:ss') +
        ' UTC** on ' +
        moment.unix(shipData.lastPos).format('DD/MM/YY') +
        `.\n> [Current Location](https://www.google.com/maps/search/${lat},+${lon})`,
      thumbnail: {
        url: 'https://cdn.discordapp.com/emojis/762940802392653864.gif',
      },
      fields: [
        {
          name: 'Current Port',
          value: shipData.currentPortName.replace(
            /(^\w|\s\w)(\S*)/g,
            (_: string, m1: string, m2: string) => m1.toUpperCase() + m2.toLowerCase(),
          ),
          inline: true,
        },
        {
          name: 'Ship Status',
          value: shipData.shipStatus,
          inline: true,
        },
        {
          name: 'Speed',
          value: `${shipData.speed} knots`,
          inline: true,
        },
      ],
      color: 0xf1d8f7,
      footer: {
        text: message.author.tag,
        iconURL: message.author.displayAvatarURL({ dynamic: true }),
      },
    });

    embed
      .attachFiles([new MessageAttachment(stopped ? KIRB_GIVEN : mapData, 'map.png')])
      .setImage('attachment://map.png')
      .setTimestamp();

    await response.delete();
    return message.channel.send(embed);
  }
}
