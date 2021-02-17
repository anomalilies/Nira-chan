import { MessageEmbed } from 'discord.js';
import { CommandoMessage } from 'discord.js-commando';

import { members, prefix } from '../../config/config.json';
import { keyv } from '../../database/keyv';
import { queenCommandMessage } from '../../config/event_handler.json';

export const handleQueenCommandMessage = async (message: CommandoMessage) => {
  if ((await keyv.get(Object.keys({ queenCommandMessage })[0])) === false) {
    return;
  }

  if (message.content.toLowerCase() === prefix + 'wk zutomayo') {
    const embed = new MessageEmbed({
      color: 15849719,
      title: 'Did you know?',
      description: `In reality, <@${members.currentOwner}> has the crown. <:queen:762902044683403272>`,
    });

    return message.say(embed);
  }
};
