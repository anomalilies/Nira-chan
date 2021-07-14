import { oneLine, stripIndent } from 'common-tags';
import { MessageEmbed } from 'discord.js';

import { colour } from '../../config/config.json';

export const archive = new MessageEmbed({
  title: 'Archive',
  color: colour,
  description: oneLine`
    Our beloved <@&770022309393334302> employees get exclusive access to the server's
    archive ~~which doesn't include much~~!
  `,
  fields: [
    {
      name: 'Server Archive',
      value: `[Google Drive Folder](https://drive.google.com/drive/folders/16RLTkFCgZcVZPYwYDTdxDJxknQUC_Ll2?usp=sharing)`,
    },
    {
      name: '2020 Bracket Results',
      value: `[Direct Download Link](https://cdn.discordapp.com/attachments/753827379427672084/775617580848381972/ZUTOMAYO_Bracket_-_October_2020.html)`,
    },
    {
      name: "Server 'Lore'",
      value: `[Google Docs Link](https://docs.google.com/document/d/1F5kUSwy7uMkdnKjuacZvJR1XeksLSsU8GweLcxynrCY/edit?usp=sharing)`,
    },
    {
      name: 'J-Music Archive',
      value: oneLine`
        In affiliation with J-Music Archive, we host a few extra goodies on their server! Be sure to check it out!
      `,
    },
  ],
});

export const nitro = new MessageEmbed({
  title: 'Emojis',
  color: colour,
  description: stripIndent`
    Are you a Nitro user, looking for more ZUTOMAYO emojis?
    Check out our affiliates!
  `,
  fields: [{ name: "Lily's Test Server", value: '[Invite](https://discord.gg/n7YcF3EDAk)' }],
});
