const Discord = require("discord.js");

global.welcome1 = new Discord.MessageEmbed()
  .setTitle("Welcome to ZUTOMAYO ZONE!")
  .setDescription("All our staff (and bots) can be categorised with their purple role colours!")
  .setColor(15849719)
  .addFields(
    {name: "Moderation of Rules", value: "**Please also note that Admins have the final say when it comes to the enforcement of *all* rules, particularly if multiple have been broken.**\nWe will always talk our actions through where possible, but if this isn’t an option, we have __every right__ to choose how a problematic member is handled.\nThank you for your understanding!\n\n**Can't see the rules?** Please react below with `[coming soon]` to gain access to <#791126859320000522>, where you'll be able to check over our moderation policies."}
);
global.welcome2 = new Discord.MessageEmbed()
.setColor(15849719)
  .addFields(
    {name: "What Should I Do Now?", value: "• New to ZUTOMAYO? Find out more about the group on <#760625396487684126>!\n• Check out our collection of exclusive ZUTOMAYO content over at <#742069780328087613>!\n• Don't feel afraid introduce yourself over at <#603246092402032673>; We pride ourselves on our friendly community, so we promise they won't bite.\n• Be sure to also familarise yourself with how the server is run on <#760621183564513312>, and grab some roles from <#781296501351383050> whilst you're at it!"},
    {name: "Permanent Invite Link", value: "If you'd like, feel free to invite your friends to the ZONE with the link below:"}
);