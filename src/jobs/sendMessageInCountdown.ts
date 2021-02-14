import { CronJob } from 'cron';
import { TextChannel } from 'discord.js';
import { CommandoClient } from 'discord.js-commando';

import { themechannels, cronschedules } from '../config/config.json';

export const sendMessageInCountdownJob = async (client: CommandoClient) => {
  return new CronJob(
    cronschedules.servertopic,
    () => {
      const channel = <TextChannel>client.channels.cache.find((channel) => channel.id === themechannels.countdown);
      if (channel == undefined) {
        return console.error("Couldn't find channel with ID", themechannels.countdown);
      }
      channel.send('s');
    },
    null,
    false,
    'Europe/London',
  );
};
