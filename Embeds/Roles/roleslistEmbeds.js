const Discord = require("discord.js");

global.roles1 = new Discord.MessageEmbed()
  .setTitle("Staff Roles")
  .setDescription("All our staff (and bots) can be categorised with their purple role colours!")
  .setColor(240116)
  .addFields(
    {name: "Admins", value: `<@&603441627729625139> are charge of the server and its general upkeep.`},
    {name: "(Former) King", value: `Dedicated to the server's creator, our <@&778719212993773608> <@208960237988741123>!`},
    {name: "Moderators", value: `As you could imagine, our <@&742061218860236840> are in charge of server moderation.`},
    {name: "Emoji Curators", value: `<@&756292255282757734> help provide implementation of emoji suggestions from <#603248273100242964>.`},
    {name: "Other Staff", value: `<@&778719739291631636> are miscellaneous staff members that help out with small server-related tasks!`},
    {name: "Bots", value: `<@&742082022729580715> are pretty much what you'd imagine them to be.`}
);
global.roles2 = new Discord.MessageEmbed()
  .setTitle("Awarded Roles")
  .setDescription("Exclusive roles dedicated to our most active contributors, or to the winners of our monthly server contests!")
  .setColor(240116)
  .addFields(
    {name: "Contest Winners", value: `An exclusive role solely for our <@&761383548476325888> from the <#761326959154167838> channel.`},
    {name: "Runners-Up", value: `Given to our <@&761383550741643284> from server contests held on the <#761326959154167838> channel.`},
    {name: "Welcoming Pupper", value: `From <@314358105205112834>'s loving welcomes he gives to all our new members!`},
    {name: "Ghostbuster", value: `Awarded to <@155425784109072384>, after achieving the highest score in the server for the Halloween Google Doodle game.`},
    {name: "Summoner", value: `A role from a server inside-joke, dedicated to <@126355183608397825>'s extraordinary ability to summon others.`},
    {name: "Loremaster", value: `A role commemorating <@721736867107700758>'s insane dedication with researching ZUTOMAYO lore.`}
);
global.roles3 = new Discord.MessageEmbed()
  .setTitle("Contributor Roles")
  .setDescription("Given to those who have contributed their time to the server!")
  .setColor(240116)
  .addFields(
    {name: "Server Boosters", value: `For our lovely <@&744738039116464151>!`},
    {name: "Regulars", value: `The <@&751209585464836137> role is given to our most active users on a weekly basis.`},
    {name: "Musicians", value: `Given to our <@&758774148154523669> from <#603248158088101929>, with talents ranging from singing, to guitar!`},
    {name: "Artists", value: `Given to our most creative and active <@&758774087161741363>!`},
    {name: "Theorists", value: `The <@&756314524285534259> role is awarded to users who have spent their free-time making theories based on ZUTOMAYO MVs!`},
    {name: "Meme Royalty", value: `The <@&751205513806610454> role is awarded to our most-active meme creators!`},
    {name: "Translators and Editors", value: `<@&742061039532638278> and <@&742061295255289859> are volunteers who help and translate ZUTOMAYO goodies exclusively for the server!`},
    {name: "Stans", value: `<@&742066260811972709> are members in charge of updating and providing <#742069780328087613>.`},
    {name: "Hackers", value: `Our <@&769728601036947467> provide invaluable help with developing and debugging <@740606402330099752>.`},
    {name: "Journalists", value: `<@&765670343934345277> help our staff provide up-to-date ZUTOMAYO news on <#603248261461180480>.`},
    {name: "Contestants", value: `For all our <@&770792091353743401> from the <#761326959154167838> channel!`},
    {name: "Contributors", value: `The <@&761383555372023860> role comes with all awarded roles and those who have entered contests, as to separate users on the member list.`},
    {name: "Affiliates", value: `Our <@&744728162843492404> from [r/ZUTOMAYO](https://www.reddit.com/r/ZUTOMAYO/), and other Discord servers!`}
);
global.roles4 = new Discord.MessageEmbed()
  .setTitle("Exclusive Roles")
  .setDescription("From limited-edition <#758494476174884905> listings, or given out from inside jokes!")
  .setColor(240116)
  .addFields(
    {name: "h̷͂̒ē̶̓ ̶͂͝w̴̍̆h̶͛̉o̵͒̍ ̵̑̄s̸̛͝h̵̑̃a̵͂͆l̶̘̋l̶̋̕ ̷̌̍n̶̽͠ŏ̴̚ť̵̍ ̸͋̊b̵̔̅é̷̩ ̵̒͂n̸̈́͠ȃ̴̈́ṁ̴̺e̴̿͝d̷͛͐", value: `We don't know why we gave this to <@208960237988741123>, either.`},
    {name: "Queen", value: `<@228880116699103232>'s nickname!`},
    {name: "Pope", value: `<@737697842507939840>'s nickname... For some reason?`},
    {name: "ἰχθύς", value: `Dedicated to <@205837815630659593>!`},
    {name: "Fisherban", value: `A role created from an inside-joke, born from the rivalry seen in <#747201864889794721>.`},
    {name: "Paint Drinkers", value: `Still don't know how this meme started...`},
    {name: "Bri'ish", value: `For all our British members, born from yet another server inside-joke, and available from <#603248229928140801> if you react with 🇬🇧 when prompted.`}
);