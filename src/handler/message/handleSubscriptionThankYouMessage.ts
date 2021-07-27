import { CommandoMessage } from 'discord.js-commando';

import { subscriptionThankYouMessage } from '../../config/event_handler.json';
import { keyv } from '../../database/keyv';
import { homeGuild } from '../../config/config.json';

const subscriptionTypes = [
  'USER_PREMIUM_GUILD_SUBSCRIPTION',
  'USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_1',
  'USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_2',
  'USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_3',
];

export const handleSubscriptionThankYouMessage = async (message: CommandoMessage) => {
  if ((await keyv.get(Object.keys({ subscriptionThankYouMessage })[0])) === false) {
    return;
  }

  if (subscriptionTypes.includes(message.type) && message.guild.id === homeGuild) {
    message.say('Thank you so much! <:niraStar:777740701441064960>');
  }
};
