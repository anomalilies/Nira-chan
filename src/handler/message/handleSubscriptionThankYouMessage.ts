import { Message } from 'discord.js';

const subscriptionTypes = [
  'USER_PREMIUM_GUILD_SUBSCRIPTION',
  'USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_1',
  'USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_2',
  'USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_3',
];

export const handleSubscriptionThankYouMessage = (message: Message) => {
  if (subscriptionTypes.includes(message.type)) {
    message.channel.send('Thank you so much! <:niraStar:777740701441064960>');
  }
};
