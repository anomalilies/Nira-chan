require("dotenv").config();
const cron = require("cron");
const fs = require("fs");
const Commando = require("discord.js-commando");
const configFileName = process.env.NIRA_DEV ? "config.dev.json" : "config.json";
const { prefix, cronschedules, themechannels, allowlists, members } = require(`./${configFileName}`);
const { MessageEmbed } = require("discord.js");
const songs = require("./Data/songs.json");

// Commando
const client = new Commando.CommandoClient({
    owner: members.currentowner,
    commandPrefix: prefix,
    unknownCommand: false,
    disableEveryone: true
});

// Events and Commands
fs.readdir("./Events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach((file) => {
        const event = require(`./Events/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, event.bind(null, client));
    });
});

// Monthly Server Topics
var channelTitles = songs.mvSongs.engName;
const channelChange = new cron.CronJob(
    cronschedules.servertopic,
    () => {
        const channel = client.channels.cache.find((channel) => channel.id === themechannels.servertopic);
        const random = Math.floor(Math.random() * channelTitles.length);
        channel.setName(channelTitles[random]);
    },
    null,
    true,
    "Etc/UTC"
);
channelChange.start();

// s
const scheduledMessage = new cron.CronJob(
    cronschedules.countdown,
    () => {
        const channel = client.channels.cache.find((channel) => channel.id === themechannels.countdown);
        channel.send("s");
    },
    null,
    true,
    "Europe/London"
);
scheduledMessage.start();

// Starboard
var contributorRoles = [
    "Journalists",
    "Contestants",
    "Hackers",
    "Stans",
    "Editors",
    "Translators",
    "Meme Royalty",
    "Theorists",
    "Musicians",
    "Artists"
];
const inContributorGroup = (r) => contributorRoles.includes(r.name);

client.on("messageReactionAdd", async (reaction, user) => {
    // TODO: Identify channel - object is starboard, id appears to be hall-of-fame
    const starboard = client.channels.cache.find((channel) => channel.id === "778734720879951922");
    const message = reaction.message;
    if (message.reactions.cache.get("⭐") && allowlists.contributionchannels.includes(message.channel.id)) {
        message.reactions.cache
            .get("⭐")
            .fetch()
            .then(async (starReaction) => {
                if (starReaction.count >= 5) {
                    const handleStarboard = async () => {
                        const image = message.attachments.size > 0 ? message.attachments.array()[0].url : "";

                        const msgs = await starboard.messages.fetch({ limit: 100 });
                        const existingMsg = msgs.find((msg) =>
                            msg.embeds.length === 1 ? msg.embeds[0].footer.text.startsWith(reaction.message.id) : false
                        );

                        if (!existingMsg && message.member.roles.cache.some(inContributorGroup)) {
                            const embed = new MessageEmbed()
                                .setColor(16755763)
                                .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                                .setDescription(`${message.content}\n\n[context](${message.url})`)
                                .setImage(image)
                                .setFooter(reaction.message.id)
                                .setTimestamp();

                            if (starboard) {
                                starboard.send(embed);
                            }
                        }
                    };

                    if (reaction.message.partial) {
                        await reaction.fetch();
                        await reaction.message.fetch();
                        await handleStarboard();
                    } else {
                        await handleStarboard();
                    }
                }
            });
    }
});

client.login(process.env.CLIENT_TOKEN);
