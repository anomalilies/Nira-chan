const Discord = require("discord.js");
const emojis = require("./config.json");

global.contest1 = new Discord.MessageEmbed()
  .setTitle("ZUTOMAYO ZONE - Monthly Contest #1")
  .setDescription("We've talked about having contests in the server for quite some time now, and now that a new month has sprung upon us, it's time for our first competition to be announced!\nAny artists here would have heard of Inktober, and that's exactly what this month's contest will be based on.")
  .setColor(240116)
  .addFields(
    {name: "What is Inktober?", value: "Inktober is an international art challenge that takes place every October.\nArtists who participate are asked to draw one sketch a day, using a list of set prompts to inspire them, and typically with traditional inking equipment.\nHowever, to shake things up a little, we're only going to give 4 prompts out, instead of the original 31, and allow you to use whatever medium you wish!"}
)
global.contest2 = new Discord.MessageEmbed()
  .setColor(240116)
  .addFields(
    {name: "How Do I Take Part?", value: "This channel has been especially created to host server competitions!\nAfter you have verified that you have read the contest's rules below, you'll be able to submit your entries, ask any questions you may have, and ask for constructive criticism.\n\nWe understand that not everybody here is an artist, but you don't have to be; Whether you're a beginner to drawing, or an expert scholar in colour theory, we'd love to see what you come up with!\nThose who'd prefer to contribute from the side-lines will also be able to cast their votes as to which pieces are their favourites on the server's Ballot Box."}
)
global.contest3 = new Discord.MessageEmbed()
  .setTitle("Rules and Regulations")
  .setDescription("By joining this contest, you hereby agree to have read the following rules and regulations;")
  .setColor(240116)
  .addFields(
    {name: "Tracing", value: "It's fine to use a reference, but please don't directly trace your work!"},
    {name: "Art Theft", value: "Any submissions found to be stolen will result in immediate disqualification."},
    {name: "Restrictions", value: "We'd prefer original entries made solely for this contest, but there is no restriction on art previously created/entered into other competitions."},
    {name: "Permissions", value: "By submitting an entry, you give the server permission to use your art as the server's banner.\nCredit will be given to you using your Discord username in the Rules channel."}
)
global.contest4 = new Discord.MessageEmbed()
  .setTitle("What Are The Prompts?")
  .setDescription("You can pick whether or not you'd like to submit one drawing a week based on the given prompts below, or pick and mix from them all and create 1 final outcome!\nRemember, no matter how vague a prompt may be, you'll need to reference ZUTOMAYO and/or the server in your entries!")
  .setColor(240116)
  .addFields(
    {name: "Week 1", value: "October 2-8\n**Uniguri**", inline: true},
    {name: "Week 2", value: "October 9-15\n**Midnight** (Forever)", inline: true},
    {name: "Week 3", value: "October 16-22\n**Funky** (Impulses)", inline: true},
    {name: "Week 4", value: "October 23-29\n**Nira**", inline: true}
)
global.contest5 = new Discord.MessageEmbed()
  .setColor(240116)
  .addFields(
    {name: "When is the Deadline?", value: "The deadline for *all* entries will be on **Friday 30th October, 00:00 GMT/UTC**.\n\nThe rest of the 30th, up until 23:00 on the 31st, will be dedicated to voting.\nWinners, along with information for the next contest, will be released on 1st November."},
    {name: "What Prizes Are There?", value: "This channel has been especially created to host server competitions!\nAfter you have verified that you have read the contest's rules below, you'll be able to submit your entries, ask any questions you may have, and ask for constructive criticism.\n\nWe understand that not everybody here is an artist, but you don't have to be; Whether you're a beginner to drawing, or an expert scholar in colour theory, we'd love to see what you come up with!\nThose who'd prefer to contribute from the side-lines will also be able to cast their votes as to which pieces are their favourites on the server's Ballot Box."}
)
global.contest6 = new Discord.MessageEmbed()
  .setColor(240116)
  .addFields(
    {name: "1st Place", value: `• Your art as the server's header for November!\n• 250,000 UniguriXP${emojis.uniguri}.\n• A shiny new <@&761383548476325888> role.\n• The <@&758774087161741363> role, if you haven't already been awarded it.`},
    {name: "2nd Place", value: `• 175,000 UniguriXP${emojis.uniguri}.\n• A shiny new <@&761383550741643284> role.\n• The <@&758774087161741363> role, if you haven't already been awarded it.`},
    {name: "3rd Place", value: `• 100,000 UniguriXP${emojis.uniguri}.\n• A shiny new <@&761383550741643284> role.\n• The <@&758774087161741363> role, if you haven't already been awarded it.`},
    {name: "Participation Awards", value: `• 10,000 UniguriXP${emojis.uniguri}.\n• The new <@&770792091353743401> role!`}
)