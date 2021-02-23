import { MessageReaction } from 'discord.js';
import { CommandoClient } from 'discord.js-commando';

import { onMessageReactionAdd } from '../config/event_handler.json';
import { keyv } from '../database/keyv';
import { handleHallOfFame, handleStarboard } from '../handler';

export default async function (client: CommandoClient, partialReaction: MessageReaction) {
  if ((await keyv.get(Object.keys({ onMessageReactionAdd })[0])) === false) {
    return;
  }

  let reaction = partialReaction;

  if (partialReaction.partial) {
    reaction = await partialReaction.fetch();
  }

  await handleStarboard(reaction);

  await handleHallOfFame(reaction);
}
