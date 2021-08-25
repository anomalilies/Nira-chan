import { MessageEmbed } from 'discord.js';
import { CommandoMessage } from 'discord.js-commando';

import { keyv } from '../database/keyv';
import { songInfo } from '../config/event_handler.json';
import { colour } from '../config/config.json';
import songsList from '../data/songs.json';

export const handleSongInfo = async (message: CommandoMessage, prefix: string) => {
  if ((await keyv.get(Object.keys({ songInfo })[0])) === false) {
    return;
  }

  const songs = songsList.map((s) => s.engName);
  let song: Record<string, string>;

  songs.forEach((s, i) => {
    if (message.content.startsWith(prefix + s.toLowerCase())) {
      return (song = songsList[i]);
    }
  });

  if (song !== undefined) {
    const embed = new MessageEmbed({
      title: song.japName,
      color: colour,
      description: `${song.engName}\n${song.desc}`,
      fields: [
        {
          name: 'Album',
          value: `...`,
          inline: true,
        },
        {
          name: 'Track',
          value: `#`,
          inline: true,
        },
      ],
      footer: {
        text: message.author.tag,
        iconURL: message.author.displayAvatarURL({ dynamic: true }),
      },
      thumbnail: { url: 'https://cdn.discordapp.com/emojis/802739140767776809.png?v=1' },
    });
    message.channel.send(embed).then((msg) => {
      if (song.link !== undefined) {
        msg.channel.send(song.link);
      }
    });
  }
};
