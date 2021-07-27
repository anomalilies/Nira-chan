import serverInfoEmbed from '../embeds/serverInfoEmbed';

import { TextChannel, ActivityOptions } from 'discord.js';
import { CommandoClient } from 'discord.js-commando';

import { allChannels } from '../config/config.json';
import { welcomeCommands } from '../embeds/welcome/welcomeCommands';
import { rolesListCommands } from '../embeds/roles/roleslistCommands';
import { rolePickerCommands } from '../embeds/rolePicker/rolePickerCommands';
import { livesAndPerformancesCommands } from '../embeds/livesAndPerformances/livesAndPerformancesCommands';
import { contestCommands } from '../embeds/contest/contestCommands';
import { botCommands } from '../embeds/bots/botCommands';
import { archiveCommands } from '../embeds/archive/archiveCommands';
import { aboutCommands } from '../embeds/about/aboutCommands';
import { hachanJAJAJA } from '../jobs/hachanJAJAJA';
import { updateMap } from '../jobs/emojiMap';
import songsList from '../data/songs.json';

const strings: Array<string> = [
  'you in disgust.',
  '(staring at) you.',
  'you in pain— owie!',
  'over the fishy league!',
  'you~wu~(♥ω♥*)!',
  'you, forever & always.',
  ';´༎ຶਊ ༎ຶ`;',
];

function changeBotStatus(client: CommandoClient) {
  let plural = '';
  if (client.guilds.cache.size > 1) {
    plural = 's';
  }
  const songs = songsList.map((s) => s.engName);

  const statuses: ActivityOptions[] = [
    { name: strings[Math.floor(Math.random() * strings.length)], type: 'WATCHING' },
    { name: `${client.guilds.cache.size} server${plural}!`, type: 'WATCHING' },
    { name: songs[Math.floor(Math.random() * songs.length)] + '!', type: 'LISTENING' },
  ];
  client.user.setActivity(statuses[Math.floor(Math.random() * statuses.length)]);
}

function checkLurkers(client: CommandoClient) {
  const list = client.guilds.cache.get('757726578309595238');
  const lurkersRole = list.roles.cache.find((role) => role.name === 'Lurkers');

  list.members.cache.each((member) => {
    if (!member.roles.cache.get(lurkersRole.id)) {
      if (Date.now() - member.joinedTimestamp > 86400000) {
        member.roles.add(lurkersRole);
      } else return;
    }
  });
}

function checkNewbies(client: CommandoClient) {
  const guild = client.guilds.cache.get('603246092402032670');

  const newbiesRole = guild.roles.cache.find((role) => role.name === 'Newbies');
  const VIPRole = guild.roles.cache.find((role) => role.name === 'ZUTOMAYO V.I.P.');
  const sticklerRole = guild.roles.cache.find((role) => role.name === 'Stickler for Rules').id;

  newbiesRole.members.forEach((member) => {
    if (Date.now() - member.joinedTimestamp > 259200000) {
      member.roles.add(VIPRole).then(() => member.roles.remove(newbiesRole));
    } else if (member.roles.cache.get(sticklerRole)) {
      member.roles.remove(sticklerRole);
    }
  });
}

export default async function (client: CommandoClient) {
  client.user.setActivity('over my deployment!', { type: 'WATCHING' });

  console.log(`${client.user.tag} activated!`);
  client.guilds.cache.forEach((guild) => {
    console.log(`${guild.name} | ${guild.id}`);
  });

  setInterval(() => changeBotStatus(client), 1 * 60 * 1000);

  if (process.env.NODE_ENV === 'production') {
    setInterval(() => checkLurkers(client), 1 * 60 * 60 * 1000);
    setInterval(() => checkNewbies(client), 1 * 60 * 60 * 1000);

    const channel = <TextChannel>client.channels.cache.get(allChannels.archive);
    const msg = await channel.messages.fetch({ around: '776320801729019934', limit: 1 });
    const fetchedMsg = msg.first();

    setInterval(async function () {
      fetchedMsg.edit(await serverInfoEmbed(fetchedMsg.guild));
    }, 300000);

    aboutCommands(client);
    archiveCommands(client);
    botCommands(client);
    contestCommands(client);
    livesAndPerformancesCommands(client);
    rolePickerCommands(client);
    rolesListCommands(client);
    welcomeCommands(client);
    hachanJAJAJA(client);
    updateMap(client);
  }
}
