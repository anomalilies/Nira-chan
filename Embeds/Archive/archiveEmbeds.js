const Discord = require("discord.js");

global.archive = new Discord.MessageEmbed()
  .setTitle("Server Archive")
  .setDescription("Our beloved <@&770022309393334302> employees get exclusive access to the server's archive ~~which doesn't include much~~!")
  .setColor(15849719)
  .addFields(
    {name: "Server Content", value: "[Google Drive Folder](https://drive.google.com/drive/folders/16RLTkFCgZcVZPYwYDTdxDJxknQUC_Ll2?usp=sharing)"},
    {name: "2020 Bracket Results", value: "[Direct Download Link](https://cdn.discordapp.com/attachments/753827379427672084/775617580848381972/ZUTOMAYO_Bracket_-_October_2020.html)"},
    {name: "J-Music Archive", value: "In affiliation with J-Music Archive, we host a few extra goodies on their server! Be sure to check it out!"}
);
global.lore = new Discord.MessageEmbed()
  .setDescription("Apart from being used as an archive, this channel's primary purpose is to host 'server lore' conversations/nFor more information, check out <@81286698306117632>'s collection of server lore and historic tales!")
  .setColor(15849719)
  .addFields(
    {name: "Server Lore", value: "[Google Docs Link](https://docs.google.com/document/d/1F5kUSwy7uMkdnKjuacZvJR1XeksLSsU8GweLcxynrCY/edit?usp=sharing)"}
  )