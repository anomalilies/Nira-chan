const Discord = require("discord.js");

global.archive = new Discord.MessageEmbed()
  .setTitle("Server Archive")
  .setDescription("Our beloved <@&770022309393334302> employees get exclusive access to the server's archive ~~which doesn't include much~~!")
  .setColor(15849719)
  .addFields(
    {name: "Server Content", value: "[Google Drive Folder](https://drive.google.com/drive/folders/16RLTkFCgZcVZPYwYDTdxDJxknQUC_Ll2?usp=sharing)"},
    {name: "2020 Bracket Results", value: "[Direct Download Link](https://cdn.discordapp.com/attachments/742069780328087613/773316445622632458/ZUTOMAYO_Bracket_-_October_2020.html)"},
    {name: "ZUTOMAYO Archive", value: "Use the invite link below to get access to our backup archive server, for a few extra goodies not inlcuded on <#742069780328087613>!"}
);
global.lore = new Discord.MessageEmbed()
  .setDescription("Apart from being used as an archive, this channel's primary purpose is to host 'server lore' conversations/nFor more information, check out <@81286698306117632>'s collection of server lore and historic tales!")
  .setColor(15849719)
  .addFields(
    {name: "Server Lore", value: "[Google Docs Link](https://docs.google.com/document/d/1F5kUSwy7uMkdnKjuacZvJR1XeksLSsU8GweLcxynrCY/edit?usp=sharing)"}
);