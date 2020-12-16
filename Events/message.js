const Commando = require("discord.js-commando");
const { prefix, commandNames, allowlists, emojis, patpatresponses, nira9000 } = require("../config.json");

const { MessageEmbed } = require("discord.js");
const rules = require("../Embeds/ruleEmbeds.json");
rules.forEach((rule, i) => rule.re = new RegExp(`(\\s|^)${prefix}${i+1}(\\s|$)`));

var uwuifying = require("../Commands/Fun/UWU Translator/uwuify");
var data = require("../Commands/Fun/UWU Translator/data");

var whosTalkingWithPatPat = new Set();
var fishyCommands = [
    "fishy", "fishytimer", "fishystats", "leaderboard fishy", "fish", "fihy", "fisy", "foshy", "fisyh", "fsihy", "fin",
    "fintimer", "fisytimer", "foshytimer", "ft", "finstats", "fisystats", "foshystats", "fs", "leaderboard fishysize"
];

// Embeds
function getSimpleEmbed(color, title, author, description) {
    return new MessageEmbed()
        .setColor(color)
        .setTitle(title)
        .setAuthor(author.username, author.avatarURL({ dynamic: true }))
        .setDescription(description);
}

// Replace a regular message with a message sent through a webhook with the OP's name and avatar
async function replaceMessageThroughWebhook(message, resend_content) {
    if (message.channel.id !== "758541031498317835") {
        message.delete();
        const webhooks = await message.channel.fetchWebhooks();
        const webhook = webhooks.first();

        if (webhook === undefined) {
            // No webhook exists in this channel, so create one
            message.channel.createWebhook("Nira-chan")
                .then(webhook => {
                    // Resend the message with the OP's avatar and display name
                    webhook.send(resend_content, {
                        username: message.member.displayName,
                        avatarURL: message.author.displayAvatarURL(),
                    }
                );
            })
            .catch(console.error);
        } else {
            // Resend the message with the OP's avatar and display name
            webhook.send(resend_content, {
                username: message.member.displayName,
                avatarURL: message.author.displayAvatarURL(),
            });
        }
    }
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

module.exports = async (client, message) => {
    // Counting and Bot Check
    if (message.channel.id === "758541031498317835") {
        if (message.system || message.webhookID || message.author.bot || message.attachments.array().length) {
            message.delete();
        } else {
            message.channel.messages.fetch({ limit: 2 }).then(async messages => {
                let prevMsg = parseInt(messages.array()[1]);

                if (prevMsg) {
                    let num = parseInt(prevMsg) + 1;
                    if (message.content !== `${num}`) { // Invalid count
                        message.delete();
                    } else if (num % 1000 === 0) {      // Multiple of 1000
                        message.react("764025729696268319");
                        let pinned = await message.channel.messages.fetchPinned();
                        if (pinned.size === 50) {
                            await pinned.last().unpin();
                        }
                        message.pin();
                    }
                }
            }).catch();
        }
        return;
    }
    else if (message.webhookID || message.author == client.user || message.author.bot) {
        for (let embed of message.embeds) {
            if (embed.title === "`-wolfram <query>`" && message.channel.id === "758523806507204608") {
                message.delete();
            }
        }
        if (message.author.id == "500385855072894982" && message.content.startsWith(":no_entry_sign:")) {
            message.delete();
        }
        else return;
    }

    // UWU-ify Channel
    if (message.channel.id === "696143475954941962" || message.channel.id === "786321508527243324") {
            var str = message.content;
            uwuifying.custom(str, message, data, Commando).then(() => {
                setTimeout(function() {
                    message.delete();
                }, 4000);
            })
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
        let matched_emojis = matchEmojis(find_emojis, message.content);

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
        let starts_with_command = fishyCommands.some(word => message.content.toLowerCase().startsWith(`${prefix}`+word));

        if (starts_with_command) {
            return;
        }
        else message.delete();
    }
    if (message.channel.id === "456367532434128897" && message.author.id === "238386015520292866") {
        let starts_with_command = fishyCommands.some(word => message.content.toLowerCase().startsWith(">"+word));

        if (starts_with_command) {
            message.react("771179684851089458");
        }
        else if (!message.content.startsWith(`${prefix}uwu`) && !message.mentions.users.has(client.user.id)) {
            var str = message.content;
            uwuifying.custom(str, message, data, Commando);
            message.delete();
        }
    }

    // !work
    if (message.channel.id === "770109833713418271") {
        if (message.content.toLowerCase() === ("!work")) {
            return;
        }
        else message.delete();
    }

    // 2-Word Story Channel
    if (message.channel.id === "776229267998375946") {
        const args = message.content.trim().split(/ +/g);
        if (!args[1] || args[2]) {
            message.delete();
        }
    }

    // no u
    var noUResponses = [
        "no u", "yesn't men't", "nay thee", "[Rn] 5f¹⁴7s² × [Rn] 5f³6d¹7s²", "n-nyo u~wu",
        "Nobelium Uranium", "non tu", "no tu", "102 + 92", "`6e 6f 20 75`", "🇳 🇴  🇺", "ノユ",
        "∩O ∪", "∩∅ ∪", "`01101110 01101111 00100000 01110101`", "`-. --- / ..-`",
        "`110 111 32 117`", "`&#110;&#111;&#32;&#117;`", "ⁿᵒ ᵘ"
    ]
    let isNoU = noUResponses.some(word => message.content.toLowerCase() === word);
    if (isNoU && (Math.random() < 1/3 || message.author.id === "314358105205112834")) {
        const response = noUResponses[Math.floor(Math.random() * noUResponses.length)];
        message.channel.send(response);
    }

    // Server Rules
    if (message.guild.id === "603246092402032670") {
        if (message.member && message.member.roles.cache.get("742061218860236840")) {
            rules.filter(rule => rule.re.test(message.content))
                .map(rule => new MessageEmbed()
                .setTitle(rule.title)
                .setDescription(rule.description)
                .addFields({
                    name: "Moderation",
                    value: rule.moderation
                }))
            .forEach(rule => message.channel.send(rule));
        }
    }
};