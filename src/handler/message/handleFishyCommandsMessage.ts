import { CommandoClient, CommandoMessage } from 'discord.js-commando';

import { uwuify } from '../../util/uwuTranslator/uwuify';
import { allChannels } from '../../config/config.json';
import { fishyCommandsMessage, otherFishyMessage } from '../../config/event_handler.json';
import { keyv } from '../../database/keyv';
import { isInChannel } from '../../util/checks';

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

export const handleFishyCommandsMessage = async (message: CommandoMessage, prefix: string) => {
  if ((await keyv.get(Object.keys({ fishyCommandsMessage })[0])) === false) {
    return;
  }

  if (isInChannel(message, allChannels.fishy)) {
    const startsWithFishyCommand = fishyCommands.some((word) => {
      return message.content.toLowerCase().startsWith(prefix + word);
    });

    if (!startsWithFishyCommand) {
      return message.delete();
    }
  }
};

export const handleOtherFishyMessage = async (message: CommandoMessage, client: CommandoClient) => {
  if ((await keyv.get(Object.keys({ otherFishyMessage })[0])) === false) {
    return;
  }

  if (message.channel.id === '456367532434128897' && message.author.id === '238386015520292866') {
    const starts_with_command = fishyCommands.some((word) => message.content.toLowerCase().startsWith('>' + word));
    if (starts_with_command || message.content.startsWith('>')) {
      return message.react('771179684851089458');
    }
    if (!message.content.startsWith(client.commandPrefix + 'uwu') && !message.mentions.users.has(client.user.id)) {
      const str = message.content;
      uwuify(str, message);
      message.delete();
    }
  }
};
