import { CronJob } from 'cron';
import { TextChannel } from 'discord.js';
import { CommandoClient } from 'discord.js-commando';

import { themeChannels, cronSchedules } from '../config/config.json';

export const sendMessageInCountdownJob = async (client: CommandoClient) => {
  return new CronJob(
    cronSchedules.serverTopic,
    () => {
      const channel = <TextChannel>client.channels.cache.find((channel) => channel.id === themeChannels.countdown);
      if (channel == undefined) {
        return console.error("Couldn't find channel with ID", themeChannels.countdown);
      }
      channel.send('s');
    },
    null,
    false,
    'Europe/London',
  );
};
