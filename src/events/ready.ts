import serverInfoEmbed from '../embeds/serverInfoEmbed';

import { TextChannel } from 'discord.js';
import { CommandoClient } from 'discord.js-commando';

import { members, themechannels } from '../config/config.json';

const statuses = [
  'you in disgust.',
  '(staring at) you.',
  'you in pain— owie!',
  'over the fishy league!',
  'you~wu~(♥ω♥*)!',
  'you, forever & always.',
  ';´༎ຶਊ ༎ຶ`;',
];

const changeBotStatus = (client: CommandoClient) => {
  client.user.setActivity(statuses[Math.floor(Math.random() * statuses.length)], { type: 'WATCHING' });
};

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
  const sticklerRole = guild.roles.cache.find((role) => role.name === 'Sticker for Rules').id;

  newbiesRole.members.forEach((member) => {
    if (Date.now() - member.joinedTimestamp > 259200000) {
      member.roles.add(VIPRole).then(() => member.roles.remove(newbiesRole));
    } else if (member.roles.cache.get(sticklerRole)) {
      member.roles.remove(sticklerRole);
    }
  });
}

export default function (client: CommandoClient) {
  console.log(`${client.user.tag} activated!`);
  client.guilds.cache.forEach((guild) => {
    console.log(`${guild.name} | ${guild.id}`);
  });

  setInterval(() => changeBotStatus(client), 1 * 60 * 1000);

  if (client.user.id === members.nirachanactual) {
    setInterval(checkLurkers, 1 * 60 * 60 * 1000);
    setInterval(checkNewbies, 1 * 60 * 60 * 1000);

    // TODO: Identify channels, ???
    const channel = <TextChannel>client.channels.cache.get(themechannels.archive);
    channel.messages.fetch({ around: '776320801729019934', limit: 1 }).then((msg) => {
      const fetchedMsg = msg.first();
      setInterval(function () {
        fetchedMsg.edit(serverInfoEmbed(fetchedMsg.guild));
      }, 300000);
    });

    // TODO INCLUDE THIS AGAIN
    // aboutCommands(client, themechannels.about);
    // archiveCommands(client, themechannels.archive);
    // botCommands(client, themechannels.botcommands);
    // contestCommands(client, themechannels.contest);
    // linkCommands(client, themechannels.links);
    // roleslistCommands(client, themechannels.roleslist);
    // rolepickerCommands(client, themechannels.rolepicker);
    // welcomeCommands(client, themechannels.welcome);
  }
}
