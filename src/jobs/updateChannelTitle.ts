import { CronJob } from 'cron';
import { TextChannel } from 'discord.js';
import { CommandoClient } from 'discord.js-commando';

import { themeChannels, cronSchedules } from '../config/config.json';
import songs from '../data/songs.json';

export const updateChannelTitleJob = async (client: CommandoClient) => {
  const channelTitles = songs.mvSongs.engName;
  return new CronJob(
    cronSchedules.serverTopic,
    () => {
      const channel = <TextChannel>client.channels.cache.find((channel) => channel.id === themeChannels.serverTopic);
      if (channel == undefined) {
        return console.error("Couldn't find channel with ID", themeChannels.serverTopic);
      }
      const random = Math.floor(Math.random() * channelTitles.length);
      channel.setName(channelTitles[random]);
    },
    null,
    false,
    'Etc/UTC',
  );
};
