import { Message, MessageEmbed } from 'discord.js';
import emotions from './data';

import { colour } from '../../config/config.json';

export const uwuify = async function (text: string, message: Message) {
  if (text.slice(-1) == ' ') text = text.substring(0, text.length - 1);

  emotions.forEach((emoteClass) => {
    emoteClass[0].forEach((pattern) => {
      text = text.replace(
        new RegExp(`\\b${pattern}\\b`, 'gi'),
        () => emoteClass[1][Math.floor(Math.random() * emoteClass[1].length)],
      );
    });
  });

  text = text.replace(/(?!a?:\w+:\d+>*?)(r|l)(?![^<]*>)/g, 'w');
  text = text.replace(/(?!a?:\w+:\d+>*?)(R|L)(?![^<]*>)/g, 'W');
  text = text.replace(/(?!a?:\w+:\d+>*?)n([aeiou])(?![^<]*>)/g, 'ny$1');
  text = text.replace(/(?!a?:\w+:\d+>*?)N([aeiou])(?![^<]*>)/g, 'Ny$1');
  text = text.replace(/(?!a?:\w+:\d+>*?)N([AEIOU])(?![^<]*>)/g, 'NY$1');
  text = text.replace(/(?!a?:\w+:\d+>*?)(ove)(?![^<]*>)/g, 'uv');
  text = text.replace(/(?!a?:\w+:\d+>*?)(OVE)(?![^<]*>)/g, 'UV');

  if (text[0].match(/[a-z]/i)) text = text[0] + '-' + text;

  if (text[text.length - 1].match(/[a-z]/i)) text = text + '~~';

  if (message.channel.type === 'dm') {
    const embed = new MessageEmbed({
      author: { name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) },
      description: text,
      color: colour,
    });

    await message.channel.send(embed);
  } else {
    const webhooks = await message.channel.fetchWebhooks();
    let webhook = webhooks.first();

    if (!webhook) {
      // No webhook exists in this channel, so create one
      webhook = await message.channel.createWebhook('Nira-chan');
    }

    // Resend the message with the OP's avatar and display name
    await webhook.send(text, {
      username: message.member.displayName,
      avatarURL: message.author.displayAvatarURL(),
      files: message.attachments.array(),
    });
  }
};
