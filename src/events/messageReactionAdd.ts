import { MessageEmbed, MessageReaction, TextChannel } from 'discord.js';
import { CommandoClient } from 'discord.js-commando';

import { allChannels, allowLists, contributorRoleNames } from '../config/config.json';
import { onMessageReactionAdd } from '../config/event_handler.json';
import { keyv } from '../database/keyv';

const handleStarboard = async (hallOfFame: TextChannel, reaction: MessageReaction) => {
  const message = reaction.message;

  const image = message.attachments.size > 0 ? message.attachments.array()[0].url : '';
  const msgs = await hallOfFame.messages.fetch({ limit: 100 });
  const existingMsg = msgs.find((msg) =>
    msg.embeds.length === 1 ? msg.embeds[0].footer.text.startsWith(reaction.message.id) : false,
  );
  if (!existingMsg && message.member.roles.cache.some((r) => contributorRoleNames.includes(r.name))) {
    const embed = new MessageEmbed()
      .setColor('#FFAC33')
      .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
      .setDescription(`${message.content}\n\n[context](${message.url})`)
      .setImage(image)
      .setFooter(reaction.message.id)
      .setTimestamp();
    if (hallOfFame) {
      hallOfFame.send(embed);
    }
  }
};

export default async function (client: CommandoClient, partialReaction: MessageReaction) {
  if ((await keyv.get(Object.keys({ onMessageReactionAdd })[0])) === false) {
    return;
  }

  const hallOfFame = <TextChannel>client.channels.cache.find((channel) => channel.id === allChannels.hallOfFame);

  if (hallOfFame == undefined) {
    return;
  }

  let reaction = partialReaction;

  if (partialReaction.partial) {
    reaction = await partialReaction.fetch();
  }

  const message = reaction.message;
  const msgReaction = message.reactions.cache.get('⭐');

  if (msgReaction == undefined || !allowLists.contributionChannels.includes(message.channel.id)) {
    return;
  }

  if ((await msgReaction.fetch()).count < 5) {
    return;
  }

  await handleStarboard(hallOfFame, reaction);
}
