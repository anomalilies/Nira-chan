require("dotenv").config();
const cron = require("cron");
const Discord = require("discord.js");
const moment = require("moment");
const client = new Discord.Client();
const { prefix, commands, allowlists, emojis, patpatresponses, nira9000 } = require("./config.json");
const rules = require("./Embeds/ruleEmbeds.json");
rules.forEach((rule, i) => rule.re = new RegExp(`(\\s|^)${prefix}${i+1}(\\s|$)`));

const archiveEmbeds = require("./Embeds/archiveEmbeds")
const botEmbeds = require("./Embeds/botEmbeds");
const contestEmbeds = require("./Embeds/contestEmbeds");
const roleslistEmbeds = require("./Embeds/roleslistEmbeds");

const archiveCommands = require("./Commands/archiveCommands")
const botCommands = require("./Commands/botCommands");
const contestCommands = require("./Commands/contestCommands");
const roleslistCommands = require("./Commands/roleslistCommands");
const ruleCommands = require("./Commands/ruleCommands");

var uwuifying = require("./UWU Translator/uwuify");
var data = require("./UWU Translator/data");

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

    archiveCommands(client, "770726574865514517");
    botCommands(client, "742548177462231120");
    contestCommands(client, "770795084002230292");
    roleslistCommands(client, "758494476174884905");
    ruleCommands(client, "603248229928140801");
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

    // Akinator Easter Egg
    // Allowed in specific bot channels only
    if(allowlists.botspamchannels.includes(newMessage.channel.id)) {
        if(newMessage.content.toLowerCase().startsWith("!akinator")) {
            const embed = new Discord.MessageEmbed()
                .setAuthor(newMessage.author.tag, newMessage.author.displayAvatarURL({dynamic:true}))
                .setDescription(
                    `I'm ${Math.floor(Math.random() * (99-75+1)+75)}% sure your character is...\n\nACAne (Singer)`
                )
                .setThumbnail("https://raw.githubusercontent.com/anomalilies/Nira-chan/master/Images/ACAne.png")
                .setFooter("Is this correct? (yes/no)")
                .setColor(240116);
            newMessage.channel.send(embed);
        }
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
    if (message.content.toLowerCase().startsWith(`${prefix}${commands.uwuify.name}`)) {
        var args = message.content.slice(4).trim().split(/ +/g);
        var command = args.shift();
        var str = command + " " + args.join(" ");

        message.react("771179684851089458");
        uwuifying.custom(str, message, data, Discord);
    }
    else if (message.guild.id === "441673705458761729") {
        if (message.channel.id === "696143475954941962") {
            var str = message.content
            uwuifying.custom(str, message, data, Discord);
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

    // Akinator Easter Egg
    // Allowed in specific bot channels only
    if (allowlists.botspamchannels.includes(message.channel.id)) {
        if(message.content.toLowerCase().startsWith("!akinator")) {
            const embed = new Discord.MessageEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic:true}))
                .setDescription(
                    `I'm ${Math.floor(Math.random() * (99-75+1)+75)}% sure your character is...\n\nACAne (Singer)`
                )
                .setThumbnail("https://raw.githubusercontent.com/anomalilies/Nira-chan/master/Images/ACAne.png")
                .setFooter("Is this correct? (yes/no)")
                .setColor(240116);
            message.channel.send(embed);
        }
    }

    // Server Info
    const regions = {
        brazil: "Brazil",
        europe: "Europe",
        hongkong: "Hong Kong",
        india: "India",
        japan: "Japan",
        russia: "Russia",
        singapore: "Singapore",
        southafrica: "South Africa",
        sydney: "Sydney",
        "us-central": "US Central",
        "us-east": "US East",
        "us-west": "US West",
        "us-south": "US South"
    };

    if (message.content.toLowerCase() === `${prefix}${commands.serverinfo.name}`) {
		const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
		const members = message.guild.members.cache;
		const channels = message.guild.channels.cache;
		const serverEmojis = message.guild.emojis.cache;

        const serverInfo = new Discord.MessageEmbed()
            .setTitle(`About ${message.guild.name}`)
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .setColor(15849719)
			.addField("General", [
                `**❯ Owner:** ${message.guild.owner.user.tag}`,
				`**❯ Region:** ${regions[message.guild.region]}`,
				`**❯ Boost Tier:** ${message.guild.premiumTier ? `Tier ${message.guild.premiumTier}` : "None"}`,
				`**❯ Creation Date:** ${moment(message.guild.createdTimestamp).format("LT")}, ${moment(message.guild.createdTimestamp).format("LL")} (${moment(message.guild.createdTimestamp).fromNow()})`,
				"\u200b"
			])
			.addField("Statistics", [
				`**❯ Role Count:** ${roles.length}`,
				`**❯ Emoji Count:** ${serverEmojis.size} (${serverEmojis.filter(emoji => emoji.animated).size} animated)`,
				`**❯ Member Count:** ${message.guild.memberCount} (${members.filter(member => member.user.bot).size} bots)`,
				`**❯ Text Channels:** ${channels.filter(channel => channel.type === "text").size}`,
				`**❯ Voice Channels:** ${channels.filter(channel => channel.type === "voice").size}`,
				`**❯ Boost Count:** ${message.guild.premiumSubscriptionCount || "0"}`,
				"\u200b"
			], true)
			.addField("Presence", [
				`**❯ Online:** ${members.filter(member => member.presence.status === "online").size}`,
				`**❯ Idle:** ${members.filter(member => member.presence.status === "idle").size}`,
				`**❯ Do Not Disturb:** ${members.filter(member => member.presence.status === "dnd").size}`,
				`**❯ Offline:** ${members.filter(member => member.presence.status === "offline").size}`,
            ], true)
            
            if (message.channel.id === "770726574865514517") {
                serverInfo.addField("History", [
                    "**❯ Ex-Owner:** xscore#4740",
                    "**❯ Ex-Administrators:** Dreycan#1936",
                    "**❯ Ex-Moderators:** jiachun#0067, TheSuperCrisb#3502"
                ])
                message.channel.send(serverInfo).then((msg) => {
                    setInterval(function () {
                        msg.edit(serverInfo);
                    }, 60000)
                })
            }
            else {
                message.channel.send(serverInfo)
            }
    };

    // PatPat Command
    // Allowed in specific bot channels only
    if (allowlists.botspamchannels.includes(message.channel.id) || message.guild.id !== "603246092402032670") {
        if (message.content.toLowerCase() === `${prefix}${commands.patpatstart.name}`) {
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
        } else if (message.content.toLowerCase() === `${prefix}${commands.patpatstop.name}`) {
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
            .some(word => message.content.toLowerCase().startsWith(`${prefix}`+word));
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

    // Rule 0(w0)
    if (message.content.toLowerCase().startsWith(`${prefix}0w0`)) {
        const rule0w0 = new Discord.MessageEmbed()
            .setTitle("(Swecrwet Rwulwe) 0w0. Bwe Kwind to Youwsewf")
            .setDescription(
                "We cawe fow ywou, so stwop byeatwing youwsewf up. (・`ω´・)\nNyot evewything is youw fauwt, so "
                + "pwease keep twusting youwsewf, and ouw wespect and wuv fow you."
            );
        message.channel.send(rule0w0);
    } else if (message.content === (`${prefix}0`)) {
        const rule0 = new Discord.MessageEmbed()
            .setTitle("(Secret Rule) 0. Be Kind to Yourself")
            .setDescription(
                "We care for you, so stop beating yourself up!\nNot everything is your fault, so please keep trusting"
                + " yourself, and our respect and love for you.");
        message.channel.send(rule0);
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

    // Other Commands
    let isPrefix = message.content.toLowerCase();
    if (isPrefix.startsWith("<@!" + client.user.id + "> help")) {
        let helpEmbed = new Discord.MessageEmbed()
            .setTitle("Nira-chan's Commands")
            .setColor(15849719)
        for (const key in commands) {
            helpEmbed.addField(`${prefix}${commands[key].name}`, `${commands[key].description}`)
        }
        message.channel.send(helpEmbed);
    } else if (message.content.toLowerCase() === `${prefix}${commands.despair.name}`) {
        message.channel.send(`Aaaa, the tape is rewinding so fast! ${emojis.despair}`);
    } else if (message.content.toLowerCase().startsWith(`${prefix}${commands.dearmrf.name}`)) {
        message.channel.send(`Mr. F, I have no idea what **${message.author.username}** is saying, but something `
            + `tells me you best pay really close attention! ${emojis.wince}`);
    } else if (message.content.toLowerCase() === `${prefix}${commands.stabstabstab.name}`) {
        message.channel.send(`pokepokepoke ${emojis.fencing}`);
    }
});

client.login(process.env.CLIENT_TOKEN);