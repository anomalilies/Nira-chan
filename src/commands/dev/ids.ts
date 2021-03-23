import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import { writeFile } from 'fs';

type NameId = {
  name: string;
  id: string;
};

type ServerIds = {
  channels: NameId[];
  roles: NameId[];
  emojis: NameId[];
};

export default class IdsCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'ids',
      group: 'dev',
      memberName: 'ids',
      description: 'Saves all role, channel, and emoji IDs into a JSON file.',
      guildOnly: true,
    });
  }

  async run(msg: CommandoMessage) {
    if (process.env.NODE_ENV !== 'development') {
      return msg.say('This command is only in development allowed!');
    }

    const serverIds: ServerIds = {
      channels: [],
      roles: [],
      emojis: [],
    };

    const allChannels = Array.from(msg.guild.channels.cache.values());
    const allRoles = msg.guild.roles.cache.array();
    const allEmojis = Array.from(msg.guild.emojis.cache.array());

    allChannels.forEach((channel) => serverIds.channels.push({ id: channel.id, name: channel.name }));
    allRoles.forEach((role) => serverIds.roles.push({ id: role.id, name: role.name }));
    allEmojis.forEach((emoji) => serverIds.emojis.push({ id: emoji.id, name: emoji.name }));

    const json = JSON.stringify(serverIds);

    const path = __dirname + '/../../../server.json';
    writeFile(path, json, () => console.log('Saved all IDs in ', path));

    return msg.say('Saved IDs in JSON file - `server.json`');
  }
}
