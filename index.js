require("dotenv").config();
const cron = require("cron");
const path = require("path");
const fs = require("fs");

const Commando = require("discord.js-commando");
const { prefix, allowlists, emojis } = require("./config.json");
var data = require("./Commands/Fun/UWU Translator/data");

const archiveEmbeds = require("./Embeds/Archive/archiveEmbeds")
const botEmbeds = require("./Embeds/Bots/botEmbeds");
const contestEmbeds = require("./Embeds/Contests/contestEmbeds");
const roleslistEmbeds = require("./Embeds/Roles/roleslistEmbeds");

const archiveCommands = require("./Embeds/Archive/archiveCommands")
const botCommands = require("./Embeds/Bots/botCommands");
const contestCommands = require("./Embeds/Contests/contestCommands");
const roleslistCommands = require("./Embeds/Roles/roleslistCommands");

const client = new Commando.CommandoClient({
    owner: "228880116699103232",
    commandPrefix: prefix,
    unknownCommand: false
})

fs.readdir("./Events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
      const event = require(`./Events/${file}`);
      let eventName = file.split(".")[0];
      client.on(eventName, event.bind(null, client));
    });
});

var channelTitles = [
    "Byoushin wo Kamu", "Nouriueno Cracker", "Humanoid", "Mabushii DNA Dake", "Seigi", "Kettobashita Moufu", "Konnakoto Soudou", 
    "Haze Haseru Haterumade", "Dear Mr. 'F'", "Obenkyou Shitoiteyo", "MILABO", "Fastening", "Ham", "Darken"
];
var contributorRoles = [
    "Journalists", "Contestants", "Hackers", "Stans", "Editors",
    "Translators", "Meme Royalty", "Theorists", "Musicians", "Artists"
];

// Status
function statusChange() {
    client.user.setActivity(data.statuses[Math.floor(Math.random() * data.statuses.length)], { type: "WATCHING" });
}

// Ready Event
client.on("ready", () => {
    console.log(`${client.user.tag} activated!`);
    setInterval(statusChange, 60000);

    client.registry
    .registerGroups([
        ["fun", "Fun Commands"],
        ["misc", "Miscellaneous Commands"],
        ["util", "Utility"],
        ["commands", "Commands"]
    ])
    .registerDefaultTypes()
    .registerDefaultCommands({
        unknownCommand: false
    })
    .registerCommandsIn(path.join(__dirname, "Commands"))

    archiveCommands(client, "770726574865514517");
    botCommands(client, "742548177462231120");
    contestCommands(client, "770795084002230292");
    roleslistCommands(client, "758494476174884905");
});

// Monthly Server Topics
const scheduledMessage = new cron.CronJob("0 0 1 * *", () => {
    const channel = client.channels.cache.find(channel => channel.id === "767550623767068742");
    const random = Math.floor(Math.random() * channelTitles.length);
    channel.setName(channelTitles[random]);
}, null, true, "Etc/UTC");
scheduledMessage.start();

// Welcome Message
client.on("guildMemberAdd", member => {
    if (member.guild.id === "603246092402032670") {
        member.guild.channels.cache.get("603246092402032673").send(emojis.wave);

        var newbiesRole = member.guild.roles.cache.find(role => role.name === "Newbies");
        member.roles.add(newbiesRole);

        if (Date.now() === member.joinedAt < 604800000) {
            member.roles.remove(newbiesRole);
        }
    }
    if (member.guild.id === "706628883440468060") {
        var lurkersRole = member.guild.roles.cache.find(role => role.name === "Lurkers");
        if (Date.now() === member.joinedAt > 604800000) {
            member.roles.add(lurkersRole);
        }
    }
});

// Boost Message
client.on("guildMemberUpdate", async (oldMember, newMember) => {
    const isContributor = "761383555372023860";
    const inContributorGroup = r=>contributorRoles.includes(r.name);
    const channel = client.channels.cache.get("603246092402032673");

    if (oldMember.roles.cache.size !== newMember.roles.cache.size) {
        if (!oldMember.roles.cache.has("744738039116464151") && newMember.roles.cache.has("744738039116464151")) {
            channel.send(emojis.yay);
        }
        // Contributors Role
        else if (!oldMember.roles.cache.has(isContributor) && newMember.roles.cache.some(inContributorGroup)) {
            newMember.roles.add(isContributor);
        }
        else if (oldMember.roles.cache.has(isContributor) && !newMember.roles.cache.some(inContributorGroup)) {
            newMember.roles.remove(isContributor);
        }
    }
});

// Find specific emojis in a message
function matchEmojis(find_emojis, message_content) {
    const emoji_regexp = /<a?:\w+:\d+>/g;
    const matches = [...message_content.matchAll(emoji_regexp)];
    let matched_emojis = [];
    matches.forEach(match => {
        if (find_emojis.includes(match[0])) {
            matched_emojis.push(match[0]);
            if (match[0] === emojis.owie) {
                matched_emojis.push(emojis.cursed);
            }
        }
    });
    return matched_emojis;
}

// Check Edited Messages
async function userReactions(message) {
    {
        const userReactions = (message.reactions.cache.filter(reaction => reaction.users.cache.has(client.user.id)));
        for (const reaction of userReactions.values()) {
            await reaction.users.remove(client.user.id);
        }
    }
}

client.on("messageUpdate", async (oldMessage, newMessage) => {
    await userReactions(newMessage);

    // Check for NiraMojis in their channels
    if (allowlists.disgustchannels.includes(newMessage.channel.id)) {
        if (![emojis.disgust].includes(newMessage.content)) {
            return newMessage.delete();
        }
    } else if (allowlists.starechannels.includes(newMessage.channel.id)) {
        if (![emojis.stare].includes(newMessage.content)) {
            return newMessage.delete();
        }
    } else if (allowlists.owiechannels.includes(newMessage.channel.id)) {
        if (![emojis.owie].includes(newMessage.content)) {
            return newMessage.delete();
        }
    }
    
    // Check for NiraMojis everywhere
    if (newMessage.content.includes(emojis.disgust) || newMessage.content.includes(emojis.stare) || newMessage.content.includes(emojis.owie)) {
        const find_emojis = [emojis.disgust, emojis.stare, emojis.owie];
        let matched_emojis = matchEmojis(find_emojis, newMessage.content)

        matched_emojis.forEach(e => newMessage.react(e));
    }

    // PatPat Role
    // The member attribute is undefined on some messages so check if it's defined first
    if (newMessage.member && newMessage.member.roles.cache.get("765347466169024512")) {
        if (newMessage.content.toLowerCase().includes("patpat", emojis.patpat)) {
            newMessage.react("761487227921367051");
        }
    }

    // Nira Wave
    if (newMessage.mentions.users.has(client.user.id)) {
        newMessage.react("742394597174673458");
    }
});

client.login(process.env.CLIENT_TOKEN);