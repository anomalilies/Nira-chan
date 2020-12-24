const Discord = require("discord.js");

global.pronouns = new Discord.MessageEmbed()
  .setTitle("Pronouns")
  .setDescription("React to give yourself a role.")
  .setColor(15849719)
  .addField (
    {name: "Key"},
    {value: "<:nirahuff:755500124091973703>: `he/him`\n<:nirasigh:742130938468630659>: `she/her`\n<:nirasnrrk:750462152199897208>: `they/them`\n<:nirahuh:742104449660747908>: `any pronouns`"}
);
global.miscellaneous = new Discord.MessageEmbed()
  .setTitle("Miscellaneous")
  .setDescription("Get access to opt-in channels and all server notifications.")
  .setColor(15849719)
  .addField (
    {name: "Key"},
    {value: "<:nirasad:742096993731477505>: `All Notifications`\n<:niraeyeroll:742096470462824468>: `Fishy League Pass`\n<:nirascream:742090483446317107>: `Serious Discussion Pass`"}
);
global.dividers = new Discord.MessageEmbed()
  .setTitle("Dividers")
  .setDescription("Want to divide your roles? Claim your handy dividers here!")
  .setColor(15849719)
  .addField (
    {name: "Key"},
    {value: "<:nirayay:764025729696268319>: `Aesthetic Roles`\n<:nirapeace:756742977971552286>: `Awarded Roles`\n<:nirapunch:764027219323912202>: `Miscellaneous Roles`\n<:nirawink:764248315553775656>: `Contributor Roles`\n<:niragross:764026501066129408>: `ZONE Roles`\n<:nirascoop1:777269746722668565>: `Channel Passes`"}
);
global.colours = new Discord.MessageEmbed()
  .setTitle("Colours")
  .setDescription("Want to change your role colour? You've come to the right place!\nWith the <@781295857706336296> role, you'll be able to change your roles infinite times.\n\nThe highest role in the list below will become the colour for your username:\n• If you'd like to add a role you don't already have, react with the corresponding emoji once.\n• If you'd like to remove a pre-existing role you already have, react with the corresponding emoji twice.\n• If you'd like to remove a given role, remove your reaction by reacting with the corresponding emoji again.")
  .setColor(15849719)
  .addField (
    {name: "Key"},
    {value: "<:red:781294389241970688>: `Glass to Red Raisin`\n<:orange:781295090617811004>: `Salmon-yoi Yoi Ondo`\n<:yellow:781295102046765066>: `Saturn Saffron`\n<:green:783501246954340382>: `Seigi Sage`\n<:blue:781295124280901643>: `Marine Blue Garden`\n<:pink:781295137635958804>: `Kirby Gang`"}
);