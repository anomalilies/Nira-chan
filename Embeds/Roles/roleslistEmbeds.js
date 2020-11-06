const Discord = require("discord.js");

global.roles1 = new Discord.MessageEmbed()
  .setTitle("Staff Roles")
  .setDescription("All our staff (and bots) can be categorised with their purple role colours!")
  .setColor(240116)
  .addFields(
    {name: "Admins", value: `<@&603441627729625139> are charge of the server and its general upkeep.`},
    {name: "Moderators", value: `As you could imagine, our <@&742061218860236840> are in charge of server moderation.`},
    {name: "Emoji Curators", value: `<@&756292255282757734> help provide implementation of emoji suggestions from <#603248273100242964>.`},
    {name: "Bots", value: `<@&742082022729580715> are pretty much what you'd imagine them to be.`}
)
global.roles2 = new Discord.MessageEmbed()
  .setTitle("Awarded Roles")
  .setDescription("Exclusive roles dedicated to our most active contributors, or to the winners of our monthly server contests!")
  .setColor(240116)
  .addFields(
    {name: "Contest Winners", value: `An exclusive role solely for our <@&761383548476325888> from the <#761326959154167838> channel.`},
    {name: "Runners-Up", value: `Given to our <@&761383550741643284> from server contests held on the <#761326959154167838> channel.`},
    {name: "Ghostbuster", value: `Awarded to <@155425784109072384>, after achieving the highest score in the server for the Halloween Google Doodle game.`},
    {name: "Summoner", value: `A role from a server inside-joke, dedicated to <@126355183608397825>'s extraordinary ability to summon others.`},
    {name: "Loremaster", value: `A role commemorating <@721736867107700758>'s insane dedication with researching ZUTOMAYO lore.`},
    {name: "Fisherban", value: `Another role created from an inside-joke, born from the rivalry seen in <#747201864889794721>.`},
    {name: "Pope", value: `<@737697842507939840>'s nickname... For some reason?`},
    {name: "Welcoming Pupper", value: `From <@314358105205112834>'s loving welcomes he gives to all our new members!`}
)
global.roles3 = new Discord.MessageEmbed()
  .setTitle("Contributor Roles")
  .setDescription("Given to those who have contributed their time to the server!")
  .setColor(240116)
  .addFields(
    {name: "Server Boosters", value: `For our lovely <@&744738039116464151>!`},
    {name: "Affiliates", value: `Our <@&744728162843492404> from r/ZUTOMAYO, and other Discord servers!`},
    {name: "Regulars", value: `The <@&751209585464836137> role is given to our most active users on a weekly basis.`},
    {name: "Artists", value: `Given to our most creative and active <@&758774087161741363>!`},
    {name: "Musicians", value: `Given to our <@&758774148154523669> from <#603248158088101929>, with talents ranging from singing, to guitar!`},
    {name: "Theorists", value: `The <@&756314524285534259> role is awarded to users who have spent their free-time making theories based on ZUTOMAYO MVs!`},
    {name: "Meme Royalty", value: `The <@&751205513806610454> role is awarded to our most-active meme creators!`},
    {name: "Translators and Editors", value: `<@&742061039532638278> and <@&742061295255289859> are volunteers who help and translate ZUTOMAYO goodies exclusively for the server!`},
    {name: "Stans", value: `<@&742066260811972709> are members in charge of updating and providing <#742069780328087613>.`},
    {name: "Hackers", value: `Our <@&769728601036947467> provide invaluable help with developing and debugging <@740606402330099752>.`},
    {name: "Journalists", value: `<@&765670343934345277> help our staff provide up-to-date ZUTOMAYO news on <#603248261461180480>.`},
    {name: "Contestants", value: `For all our <@&770792091353743401> from the <#761326959154167838> channel!`},
    {name: "Contributors", value: `The <@&761383555372023860> role comes with all awarded roles and those who have entered contests, as to separate users on the member list.`}
)
global.roles4 = new Discord.MessageEmbed()
  .setTitle("Limited Edition Roles")
  .setDescription("From exclusive role shop listings, or given out from past server events/inside-jokes!")
  .setColor(240116)
  .addFields(
    {name: "Paint Drinkers", value: `Still don't know how this meme started...`},
    {name: "Bri'ish", value: `For all our British members, born from yet another server inside-joke, and available from <#603248229928140801> if you react with 🇬🇧 when prompted.`},
    {name: "Queen", value: `<@228880116699103232>'s nickname.!`}
)