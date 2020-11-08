require("dotenv").config();
const cron = require("cron");
const fs = require("fs");
const Commando = require("discord.js-commando");
const { prefix } = require("./config.json");

// Commando
const client = new Commando.CommandoClient({
    owner: "228880116699103232",
    commandPrefix: prefix,
    unknownCommand: false
})

// Events and Commands
fs.readdir("./Events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
      const event = require(`./Events/${file}`);
      let eventName = file.split(".")[0];
      client.on(eventName, event.bind(null, client));
    });
});

// Monthly Server Topics
var channelTitles = [
    "Byoushin wo Kamu", "Nouriueno Cracker", "Humanoid", "Mabushii DNA Dake", "Seigi", "Kettobashita Moufu", "Konnakoto Soudou", 
    "Haze Haseru Haterumade", "Dear Mr. 'F'", "Obenkyou Shitoiteyo", "MILABO", "Fastening", "Ham", "Darken"
];

const scheduledMessage = new cron.CronJob("0 0 1 * *", () => {
    const channel = client.channels.cache.find(channel => channel.id === "767550623767068742");
    const random = Math.floor(Math.random() * channelTitles.length);
    channel.setName(channelTitles[random]);
}, null, true, "Etc/UTC");
scheduledMessage.start();

client.login(process.env.CLIENT_TOKEN);