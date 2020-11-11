const Discord = require("discord.js");
const { emojis } = require("../../config.json");

global.contest1 = new Discord.MessageEmbed()
  .setTitle("ZUTOMAYO ZONE - Monthly Contest #2")
  .setDescription("Seeing as our last contest went so well, we're back for another!\nWith the holiday season ~~and another lockdown, here in the U.K.,~~ impending on us, this month's art contest will focus on creating a festive server banner.\nAnd, for those not interested in entering art contests, from December, we'll be extending the basis of possible entries soon!")
  .addFields(
    {name: "What Does This Entail?", value: "Everyone celebrates the holidays differently, or even not at all.\nWith this contest, we'd love to see your entries either focusing on typical holiday activities, or those unique to your culture!\nHowever, as always, you'll need to remember to reference ZUTOMAYO and/or the server in your entries!"}
);
global.contest2 = new Discord.MessageEmbed()
  .addFields(
    {name: "How Do I Take Part?", value: "<#761326959154167838> been especially created to host server competitions!\nAfter you have verified that you have read the contest's rules below, you'll be able to submit your entries, ask any questions you may have, and ask for constructive criticism.\n\nWe understand that not everybody here is an artist, but you don't have to be; Whether you're a beginner to drawing, or an expert scholar in colour theory, we'd love to see what you come up with!\nThose who'd prefer to contribute from the side-lines will also be able to cast their votes as to which pieces are their favourites on the server's <#758462946627158046>."}
);
global.contest3 = new Discord.MessageEmbed()
  .setTitle("Rules and Regulations")
  .setDescription("By joining this contest, you hereby agree to have read the following rules and regulations;")
  .addFields(
    {name: "Tracing", value: "It's fine to use a reference, but please don't directly trace your work!"},
    {name: "Art Theft", value: "Any submissions found to be stolen will result in immediate disqualification."},
    {name: "Restrictions", value: "We'd prefer original entries made solely for this contest, but there is no restriction on art previously created/entered into other competitions."},
    {name: "Permissions", value: "By submitting an entry, you give the server permission to use your art as the server's banner.\nCredit will be given to you using your Discord username in the <#603248229928140801> channel."}
);
global.contest4 = new Discord.MessageEmbed()
  .addFields(
    {name: "When is the Deadline?", value: "The deadline for *all* entries will be on **Sunday 29th November, 00:00 GMT/UTC**.\n\nThe rest of the 29th, up until 00:00 on the 30th, will be dedicated to voting.\nWinners, along with information for the next contest, will be released on 1st November."},
    {name: "What Prizes Are There?", value: `We'll be stepping up the rewards for this month's contest, seeing how the *stonks* have risen!\nAll UniguriXP${emojis.uniguri} rewards will be handed out on results day, whilst you'll be able to show off your fancy new <@&770792091353743401> role as soon as you enter!`}
);
global.contest5 = new Discord.MessageEmbed()
  .addFields(
    {name: "1st Place", value: `• Your art as the server's header for November!\n• 1,000,000 UniguriXP${emojis.uniguri}.\n• A shiny new <@&761383548476325888> role.\n• The <@&758774087161741363> role, if you haven't already been awarded it.`},
    {name: "2nd Place", value: `• 750,000 UniguriXP${emojis.uniguri}.\n• The shiny <@&761383550741643284> role.\n• The <@&758774087161741363> role, if you haven't already been awarded it.`},
    {name: "3rd Place", value: `• 250,000 UniguriXP${emojis.uniguri}.\n• The shiny <@&761383550741643284> role.\n• The <@&758774087161741363> role, if you haven't already been awarded it.`},
    {name: "Participation Awards", value: `• 50,000 UniguriXP${emojis.uniguri}.\n• The <@&770792091353743401> role!`}
);