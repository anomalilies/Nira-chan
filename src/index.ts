// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import fs from 'fs';
import { ClientEvents, MessageEmbed } from 'discord.js';
import { CommandoClient } from 'discord.js-commando';
import { updateChannelTitleJob } from './jobs/updateChannelTitle';
import { sendMessageInCountdownJob } from './jobs/sendMessageInCountdown';

export const configFile = process.env.NODE_ENV == 'production' ? 'production.json' : 'development.json';

(async () => {
  const { prefix, allowlists, members } = await import('./config/' + configFile);

  // Commando
  const client = new CommandoClient({
    owner: members.currentowner,
    commandPrefix: prefix,
    disableMentions: 'everyone',
  });

  // Events
  const eventFolderPath = __dirname + '/events/';

  fs.readdir(eventFolderPath, async (err, files) => {
    if (err) return console.error(err);
    for (const file of files) {
      const event = await import(eventFolderPath + file);
      const eventName = file.split('.')[0];
      client.on(<keyof ClientEvents>eventName, event.default);
    }
  });

  // // Starboard
  // const contributorRoles = [
  //   'Journalists',
  //   'Contestants',
  //   'Hackers',
  //   'Stans',
  //   'Editors',
  //   'Translators',
  //   'Meme Royalty',
  //   'Theorists',
  //   'Musicians',
  //   'Artists',
  // ];
  // const inContributorGroup = (r) => contributorRoles.includes(r.name);

  // client.on('messageReactionAdd', async (reaction) => {
  //   const starboard = client.channels.cache.find((channel) => channel.id === '778734720879951922');
  //   const message = reaction.message;
  //   if (message.reactions.cache.get('⭐') && allowlists.contributionchannels.includes(message.channel.id)) {
  //     message.reactions.cache
  //       .get('⭐')
  //       .fetch()
  //       .then(async (starReaction) => {
  //         if (starReaction.count >= 5) {
  //           const handleStarboard = async () => {
  //             const image = message.attachments.size > 0 ? message.attachments.array()[0].url : '';

  //             const msgs = await starboard.messages.fetch({ limit: 100 });
  //             const existingMsg = msgs.find((msg) =>
  //               msg.embeds.length === 1 ? msg.embeds[0].footer.text.startsWith(reaction.message.id) : false,
  //             );

  //             if (!existingMsg && message.member.roles.cache.some(inContributorGroup)) {
  //               const embed = new MessageEmbed()
  //                 .setColor(16755763)
  //                 .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
  //                 .setDescription(`${message.content}\n\n[context](${message.url})`)
  //                 .setImage(image)
  //                 .setFooter(reaction.message.id)
  //                 .setTimestamp();

  //               if (starboard) {
  //                 starboard.send(embed);
  //               }
  //             }
  //           };

  //           if (reaction.message.partial) {
  //             await reaction.fetch();
  //             await reaction.message.fetch();
  //             await handleStarboard();
  //           } else {
  //             await handleStarboard();
  //           }
  //         }
  //       });
  //   }
  // });

  await client.login(process.env.CLIENT_TOKEN);
  (await updateChannelTitleJob(client)).start();
  (await sendMessageInCountdownJob(client)).start();
})();
