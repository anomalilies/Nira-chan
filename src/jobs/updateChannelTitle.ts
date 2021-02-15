import { CronJob } from 'cron';
import { TextChannel } from 'discord.js';
import { CommandoClient } from 'discord.js-commando';

import { zoneChannels, cronschedules } from '../config/config.json';
import songs from '../data/songs.json';

export const updateChannelTitleJob = async (client: CommandoClient) => {
  const channelTitles = songs.mvSongs.engName;
  return new CronJob(
    cronschedules.servertopic,
    () => {
      const channel = <TextChannel>client.channels.cache.find((channel) => channel.id === zoneChannels.servertopic);
      if (channel == undefined) {
        return console.error("Couldn't find channel with ID", zoneChannels.servertopic);
      }
      const random = Math.floor(Math.random() * channelTitles.length);
      channel.setName(channelTitles[random]);
    },
    null,
    false,
    'Etc/UTC',
  );
};
