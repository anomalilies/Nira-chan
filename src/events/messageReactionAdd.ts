import { MessageEmbed, MessageReaction, TextChannel } from 'discord.js';
import { CommandoClient } from 'discord.js-commando';

import { configFile } from '..';

const contributorRoles = [
  'Journalists',
  'Contestants',
  'Hackers',
  'Stans',
  'Editors',
  'Translators',
  'Meme Royalty',
  'Theorists',
  'Musicians',
  'Artists',
];

const handleStarboard = async (hallOfFame: TextChannel, reaction: MessageReaction) => {
  const message = reaction.message;

  const image = message.attachments.size > 0 ? message.attachments.array()[0].url : '';
  const msgs = await hallOfFame.messages.fetch({ limit: 100 });
  const existingMsg = msgs.find((msg) =>
    msg.embeds.length === 1 ? msg.embeds[0].footer.text.startsWith(reaction.message.id) : false,
  );
  if (!existingMsg && message.member.roles.cache.some((r) => contributorRoles.includes(r.name))) {
    const embed = new MessageEmbed()
      .setColor(16755763)
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
  const { themechannels, allowlists } = await import('../config/' + configFile);

  const hallOfFame = <TextChannel>client.channels.cache.find((channel) => channel.id === themechannels.halloffame);

  if (hallOfFame == undefined) {
    return console.error("Couldn't find hall-of-fame, ID:", themechannels.halloffame);
  }

  let reaction = partialReaction;

  if (partialReaction.partial) {
    reaction = await partialReaction.fetch();
  }

  const message = reaction.message;
  const starEmoji = '⭐';

  // TODO invert if and return early --> eliminate 1 layer
  if (message.reactions.cache.get(starEmoji) && allowlists.contributionchannels.includes(message.channel.id)) {
    const msgReaction = message.reactions.cache.get(starEmoji);

    if (msgReaction == undefined) {
      return console.error("Couldn't find star reactions in message");
    }

    const starReaction = await msgReaction.fetch();

    if (starReaction.count < 5) {
      return;
    }

    await handleStarboard(hallOfFame, reaction);
  }
}
