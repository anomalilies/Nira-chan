import { Message } from 'discord.js';
import { zoneChannels } from '../../config/config.json';

const fishyCommands = [
  'fishy',
  'fishytimer',
  'fishystats',
  'leaderboard fishy',
  'fish',
  'fihy',
  'fisy',
  'foshy',
  'fisyh',
  'fsihy',
  'fin',
  'fintimer',
  'fisytimer',
  'foshytimer',
  'ft',
  'finstats',
  'fisystats',
  'foshystats',
  'fs',
  'leaderboard fishysize',
  'fishypun',
  'fishjoke',
  'fishyjoke',
  'squidpun',
  'squiddypun',
  'squidjoke',
  'squiddyjoke',
];

export const handleFishyCommandsMessage = (message: Message, prefix: string) => {
  if (message.channel.id === zoneChannels.fishy) {
    const startsWithFishyCommand = fishyCommands.some((word) => {
      return message.content.toLowerCase().startsWith(prefix + word);
    });

    if (startsWithFishyCommand) {
      return;
    }

    message.delete();
  }
};
