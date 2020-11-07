require("dotenv").config();
const cron = require("cron");
const path = require("path");
const fs = require("fs");

const Commando = require("discord.js-commando")
const { prefix, commandNames, allowlists, emojis, patpatresponses, nira9000 } = require("./config.json");
const rules = require("./Embeds/ruleEmbeds.json");
rules.forEach((rule, i) => rule.re = new RegExp(`(\\s|^)${prefix}${i+1}(\\s|$)`));

const archiveEmbeds = require("./Embeds/Archive/archiveEmbeds")
const botEmbeds = require("./Embeds/Bots/botEmbeds");
const contestEmbeds = require("./Embeds/Contests/contestEmbeds");
const roleslistEmbeds = require("./Embeds/Roles/roleslistEmbeds");

const archiveCommands = require("./Embeds/Archive/archiveCommands")
const botCommands = require("./Embeds/Bots/botCommands");
const contestCommands = require("./Embeds/Contests/contestCommands");
const roleslistCommands = require("./Embeds/Roles/roleslistCommands");

var uwuifying = require("./Commands/Fun/UWU Translator/uwuify");
var data = require("./Commands/Fun/UWU Translator/data");

const client = new Commando.CommandoClient({
    owner: "228880116699103232",
    commandPrefix: prefix,
    unknownCommand: false
})

var message_global;
var whosTalkingWithPatPat = new Set();
var channelTitles = [
    "Byoushin wo Kamu", "Nouriueno Cracker", "Humanoid", "Mabushii DNA Dake", "Seigi", "Kettobashita Moufu", "Konnakoto Soudou", 
    "Haze Haseru Haterumade", "Dear Mr. 'F'", "Obenkyou Shitoiteyo", "MILABO", "Fastening", "Ham", "Darken"
];
var fishyCommands = [
    "fishy", "fishytimer", "fishystats", "leaderboardfishy", "fish", "fihy", "fisy", "foshy", "fisyh", "fsihy", "fin",
    "fintimer", "fisytimer", "foshytimer", "ft", "finstats", "fisystats", "foshystats", "fs", "leaderboardfishysize"
];
var contributorRoles = [
    "Journalists", "Contestants", "Hackers", "Stans", "Editors",
    "Translators", "Meme Royalty", "Theorists", "Musicians", "Artists"
];

// Embeds
function getSimpleEmbed(color, title, author, description) {
    return new Discord.MessageEmbed()
        .setColor(color)
        .setTitle(title)
        .setAuthor(author.username, author.avatarURL({ dynamic: true }))
        .setDescription(description);
}

// Status
function statusChange() {
    client.user.setActivity(data.statuses[Math.floor(Math.random() * data.statuses.length)], { type: "WATCHING" });
}

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

// Replace a regular message with a message sent through a webhook with the OP's name and avatar
async function replaceMessageThroughWebhook(message, resend_content) {
    message.delete();
    const webhooks = await message.channel.fetchWebhooks();
    const webhook = webhooks.first();

    if (webhook === undefined) {
        // No webhook exists in this channel, so create one
        message.channel.createWebhook("Nira-chan")
            .then(webhook => {
                console.log(`Created webhook ${webhook}`);
                // Resend the message with the OP's avatar and display name
                webhook.send(resend_content, {
                    username: message.member.displayName,
                    avatarURL: message.author.displayAvatarURL({dynamic: true}),
                });
            })
            .catch(console.error);
    } else {
        // Resend the message with the OP's avatar and display name
        webhook.send(resend_content, {
            username: message.member.displayName,
            avatarURL: message.author.displayAvatarURL({dynamic:true}),
        });
    }
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

    /*archiveCommands(client, "770726574865514517");
    botCommands(client, "742548177462231120");
    contestCommands(client, "770795084002230292");
    roleslistCommands(client, "758494476174884905");*/
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
        member.roles.add(newbiesRole)
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

// Check Messages
client.on("message", async message => {
    message_global = message;

    // Check if author is bot (webhooks are fine though)
    if (!message.webhookID && (message.author == client.user || message.author.bot)) {
        return;
    }

    // UWU-ify
    if (message.guild.id === "441673705458761729") {
        if (message.channel.id === "696143475954941962") {
            var str = message.content
            uwuifying.custom(str, message, data, Commando);
        }
        else if (message.channel.id === "456367532434128897" && message.author.id === "238386015520292866") {
            message.react("771179684851089458");
        }
    }

    // Check for NiraMojis in their channels
    if (allowlists.disgustchannels.includes(message.channel.id)) {
        if (![emojis.disgust].includes(message.content)) {
            return message.delete();
        }
    } else if (allowlists.starechannels.includes(message.channel.id)) {
        if (![emojis.stare].includes(message.content)) {
            return message.delete();
        }
    } else if (allowlists.owiechannels.includes(message.channel.id)) {
        if (![emojis.owie].includes(message.content)) {
            return message.delete();
        }
    }

    // Check for NiraMojis everywhere
    if (message.content.includes(emojis.disgust) || message.content.includes(emojis.stare) || message.content.includes(emojis.owie)) {
        const find_emojis = [emojis.disgust, emojis.stare, emojis.owie];
        let matched_emojis = matchEmojis(find_emojis, message.content)

        matched_emojis.forEach(e => message.react(e));
    }

    // PatPat Role
    // The member attribute is undefined on some messages so check if it's defined first
    if (message.member && message.member.roles.cache.get("765347466169024512")) {
        if (message.content.toLowerCase().includes("patpat", emojis.patpat)) {
            message.react("761487227921367051");
        }
    }

    // Nira Wave
    if (message.mentions.users.has(client.user.id)) {
        message.react("742394597174673458");
    }

    // Check for non-nitro user using GIF emoji to resend it with the GIF emoji
    // Capture group 1 will have the emoji name in this case
    const emoji_regexp = /<a?:\w+:\d+>|(?<!\\):(\w+):/g;
    var needs_resend = false;

    // Replaces emoji names with GIF emoji
    function replaceEmoji(match, group1) {
        // The string to replace the match with
        let replaceString = match;
        if (group1) {
            // If capture group 1 caught something
            message.guild.emojis.cache.each(emoji => {
                // We need to replace non-gif emoji as well for them to show up when we resend the message
                if (emoji.name === group1) {
                    // We only need to resend if we replace any animated emoji
                    // But don't make the variable false if it's already true
                    needs_resend = emoji.animated || needs_resend;
                    let type = emoji.animated ? "a" : "";
                    replaceString = `<${type}:${emoji.name}:${emoji.id}>`;
                }
            });
        }
        return replaceString;
    }

    let resend_content = message.content.replace(emoji_regexp, replaceEmoji);
    if (needs_resend && message.member) {
        // If there were any GIF emoji added to the message
        await replaceMessageThroughWebhook(message, resend_content);
    }

    // GIF emoji of the form `-emojiname`
    if (message.guild && message.content[0] === "-") {
        message.guild.emojis.cache.each(async emoji => {
            if (message.content === `-${emoji.name}` && emoji.animated) {
                await replaceMessageThroughWebhook(message, `<a:${emoji.name}:${emoji.id}>`);
            }
        });
    }

    // PatPat Command
    // Allowed in specific bot channels only
    if (allowlists.botspamchannels.includes(message.channel.id) || message.guild.id !== "603246092402032670") {
        if (message.content.toLowerCase() === `${prefix}${commandNames.patpatstart.name}`) {
            // PatPat: start new conversations
            whosTalkingWithPatPat.add(message.author.id);

            if (message.author.id == "759338005633826817") {
                const patPatChatEmbed = getSimpleEmbed(
                    "#ffc2e8",
                    "Nira-chan has entered the chat",
                    message.author,
                    `${emojis.hal} Hewwo, Dave!~~ （＾∀＾）`);

                message.channel.send(patPatChatEmbed);
            } else {
                const patPatChatEmbed = getSimpleEmbed(
                    "#99ff00",
                    "PatPat has entered the chat",
                    message.author,
                    `Salutations, gamer! ${emojis.patpat}`);

                message.channel.send(patPatChatEmbed);
            }
        } else if (message.content.toLowerCase() === `${prefix}${commandNames.patpatstop.name}`) {
            // PatPat: end conversations
            whosTalkingWithPatPat.delete(message.author.id);

            if (message.author.id == "759338005633826817") {
                const patPatChatEmbed = getSimpleEmbed(
                    "#ffc2e8",
                    "Nira-chan has left the chat",
                    message.author,
                    `${emojis.hal} D-Dave, this convewsation can sewve nyo puwpose anymoweu(⋟﹏⋞) Goodbyeu~`);

                message.channel.send(patPatChatEmbed);
            } else {
                const patPatChatEmbed = getSimpleEmbed(
                    "#ff9900",
                    "PatPat has left the chat",
                    message.author,
                    `Gud niet yeahyeah— ${emojis.patpat}`);

                message.channel.send(patPatChatEmbed);
            }
        }
        else if (whosTalkingWithPatPat.has(message.author.id)) {
            // PatPat: ongoing conversations
            if (message.author.id == "759338005633826817") {
                const index = Math.floor(Math.random() * nira9000.length);

                const patPatChatEmbed = getSimpleEmbed(
                    "#ffc2e8",
                    "Nira-chan says...",
                    message.author,
                    `${emojis.hal} ${nira9000[index]}`);

                message.channel.send(patPatChatEmbed);
            } else {
                const index = Math.floor(Math.random() * patpatresponses.length);

                const patPatChatEmbed = getSimpleEmbed(
                    "#0099ff",
                    "PatPat says...",
                    message.author,
                    `${patpatresponses[index]}`);

                message.channel.send(patPatChatEmbed);
            }
        }
    }

    // Fishy Commands
    if (message.channel.id === "747201864889794721") {
        let starts_with_command = fishyCommands
            .some(word => message.content.toLowerCase().startsWith(`${prefix}`+word+` `));
        if (message.mentions.members.first() || starts_with_command) {
            return;
        }
        else message.delete();
    }

    // !work
    if (message.channel.id === "770109833713418271") {
        if (message.content.toLowerCase() === ("!work")) {
            return;
        }
        else message.delete();
    }

    // Server Rules
    if (message.member.roles.cache.get("742061218860236840")) {
        rules.filter(rule => rule.re.test(message.content))
            .map(rule => new Discord.MessageEmbed()
                .setTitle(rule.title)
                .setDescription(rule.description)
                .addFields({
                    name: "Moderation",
                    value: rule.moderation
                }))
            .forEach(rule => message.channel.send(rule));
    }
});

client.login(process.env.CLIENT_TOKEN);