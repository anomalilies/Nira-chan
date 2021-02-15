import { CronJob } from 'cron';
import { TextChannel } from 'discord.js';
import { CommandoClient } from 'discord.js-commando';

import { zoneChannels, cronschedules } from '../config/config.json';

export const sendMessageInCountdownJob = async (client: CommandoClient) => {
  return new CronJob(
    cronschedules.servertopic,
    () => {
      const channel = <TextChannel>client.channels.cache.find((channel) => channel.id === zoneChannels.countdown);
      if (channel == undefined) {
        return console.error("Couldn't find channel with ID", zoneChannels.countdown);
      }
      channel.send('s');
    },
    null,
    false,
    'Europe/London',
  );
};
