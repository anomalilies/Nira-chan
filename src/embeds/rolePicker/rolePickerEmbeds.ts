import { MessageEmbed } from 'discord.js';

export const pronouns = new MessageEmbed()
  .setTitle('Pronouns')
  .setDescription('React to give yourself a role.')
  .setColor('#F1D8F7')
  .addFields({
    name: 'Key',
    value:
      '<:niraHuff:755500124091973703> : `he/him`\n<:niraSigh:742130938468630659> : `she/her`\n<:niraSnrrk:750462152199897208> : `they/them`\n<:niraHuh:742104449660747908> : `any pronouns`',
  });

export const miscellaneous = new MessageEmbed()
  .setTitle('Miscellaneous')
  .setDescription('Get access to opt-in channels and all server notifications.')
  .setColor('#F1D8F7')
  .addFields({
    name: 'Key',
    value:
      '<:niraSad:742096993731477505> : `All Notifications`\n<:niraEyeroll:742096470462824468> : `Fishy League Pass`\n<:niraScream:742090483446317107> : `Serious Discussion Pass`',
  });

export const dividers = new MessageEmbed()
  .setTitle('Dividers')
  .setDescription('Want to divide your roles? Claim your handy dividers here!')
  .setColor('#F1D8F7')
  .addFields({
    name: 'Key',
    value:
      '<:niraYay:764025729696268319> : `Aesthetic Roles`\n<:niraPeace:756742977971552286> : `Awarded Roles`\n<:niraPunch:764027219323912202> : `Miscellaneous Roles`\n<:niraWink:764248315553775656> : `Contributor Roles`\n<:niraGross:764026501066129408> : `ZONE Roles`\n<:niraScoopYAY:777269746722668565> : `Channel Passes`',
  });

export const colours = new MessageEmbed()
  .setTitle('Colours')
  .setDescription(
    "Want to change your role colour? You've come to the right place!\nWith the <@&781295857706336296> role, you'll be able to change your roles infinite times.\n\n**The highest role in the list below will become the colour for your username:**\n• If you'd like to add a role you don't already have, react with the corresponding emoji once.\n• If you'd like to remove a pre-existing role you already have, react with the corresponding emoji twice.\n• If you'd like to remove a given role, remove your reaction by reacting with the corresponding emoji again.",
  )
  .setColor('#F1D8F7')
  .addFields({
    name: 'Key',
    value:
      '<:red:781294389241970688> : `Glass to Red Raisin`\n<:orange:781295090617811004> : `Salmon-yoi Yoi Ondo`\n<:yellow:781295102046765066> : `Saturn Saffron`\n<:green:783501246954340382> : `Seigi Sage`\n<:blue:781295124280901643> : `Marine Blue Garden`\n<:pink:781295137635958804> : `Kirby Gang`',
  });
