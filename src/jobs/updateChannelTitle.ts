import { CronJob } from 'cron';
import { TextChannel } from 'discord.js';
import { CommandoClient } from 'discord.js-commando';

import { configFile } from '..';
import songs from '../../Data/songs.json';

export const updateChannelTitleJob = async (client: CommandoClient) => {
  const { themechannels, cronschedules } = await import('../config/' + configFile);
  const channelTitles = songs.mvSongs.engName;
  return new CronJob(
    cronschedules.servertopic,
    () => {
      const channel = <TextChannel>client.channels.cache.find((channel) => channel.id === themechannels.servertopic);
      if (channel == undefined) {
        return console.error("Couldn't find channel with ID", themechannels.servertopic);
      }
      const random = Math.floor(Math.random() * channelTitles.length);
      channel.setName(channelTitles[random]);
    },
    null,
    false,
    'Etc/UTC',
  );
};
