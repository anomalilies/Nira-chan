import { oneLineTrim, stripIndent } from 'common-tags';
import { MessageEmbed } from 'discord.js';

import { colour } from '../../config/config.json';

export const pronouns = new MessageEmbed({
  title: 'Pronouns',
  description: 'React to give yourself a role.',
  color: colour,
  fields: [
    {
      name: 'Key',
      value: stripIndent`
        <:niraHuff:755500124091973703> : \`he/him\`
        <:niraSigh:742130938468630659> : \`she/her\`
        <:niraSnrrk:750462152199897208> : \`they/them\`
        <:niraHuh:742104449660747908> : \`any pronouns\`
      `,
    },
  ],
});

export const miscellaneous = new MessageEmbed({
  title: 'Miscellaneous',
  description: 'Get access to opt-in channels and all server notifications.',
  color: colour,
  fields: [
    {
      name: 'Key',
      value: stripIndent`
        <:niraSad:742096993731477505> : \`All Notifications\`
        <:niraEyeroll:742096470462824468> : \`Fishy League Pass\`
        <:niraScream:742090483446317107> : \`Serious Discussion Pass\`
        <:nirritated:742090783913541732> : \`Health and Beauty Pass\`
      `,
    },
  ],
});

export const dividers = new MessageEmbed({
  title: 'Dividers',
  description: 'Want to divide your roles? Claim your handy dividers here!',
  color: colour,
  fields: [
    {
      name: 'Key',
      value: stripIndent`
        <:niraYay:764025729696268319> : \`Aesthetic Roles\`
        <:niraPeace:756742977971552286> : \`Awarded Roles\`
        <:niraPunch:764027219323912202> : \`Miscellaneous Roles\`
        <:niraWink:764248315553775656> : \`Contributor Roles\`
        <:niraGross:764026501066129408> : \`ZONE Roles\`
        <:niraScoopYAY:777269746722668565> : \`Channel Passes\`
      `,
    },
  ],
});

export const colours = new MessageEmbed({
  title: 'Colours',
  description: oneLineTrim`
    Want to change your role colour? You've come to the right place!\n
    With the <@&781295857706336296> role, you'll be able to change your roles infinite times.\n\n
    **The highest role in the list below will become the colour for your username:**\n
    • If you'd like to add a role you don't already have, react with the corresponding emoji once.\n
    • If you'd like to remove a pre-existing role you already have, react with the corresponding emoji twice.\n
    • If you'd like to remove a given role, remove your reaction by reacting with the corresponding emoji again.
  `,
  color: colour,
  fields: [
    {
      name: 'Key',
      value: stripIndent`
        <:red:781294389241970688> : \`Glass to Red Raisin\`
        <:orange:781295090617811004> : \`Salmon-yoi Yoi Ondo\`
        <:yellow:781295102046765066> : \`Saturn Saffron\`
        <:green:783501246954340382> : \`Seigi Sage\`
        <:blue:781295124280901643> : \`Marine Blue Garden\`
        <:pink:781295137635958804> : \`Kirby Gang\`
      `,
    },
  ],
});
