const configFileName = process.env.NIRA_DEV ? 'config.dev.json' : 'config.json';
const { prefix, commandNames, homeguild, allowlists, members, emojis, zoneRoles } = require(`../${configFileName}`);
const nira9000 = require("../Data/nira9000.json");
const patpatresponses = require("../Data/patpatresponses.json");

const { MessageEmbed } = require("discord.js");
const rules = require("../Embeds/ruleEmbeds.json");
rules.forEach((rule, i) => rule.re = new RegExp(`(\\s|^)${prefix}${i+1}(\\s|$)`));

var uwuifying = require("../Commands/Fun/UWU Translator/uwuify");
var whosTalkingWithPatPat = new Set();

var fishyCommands = [
    "fishy", "fishytimer", "fishystats", "leaderboard fishy", "fish", "fihy", "fisy", "foshy", "fisyh", "fsihy", "fin",
    "fintimer", "fisytimer", "foshytimer", "ft", "finstats", "fisystats", "foshystats", "fs", "leaderboard fishysize",
    "fishypun", "fishjoke", "fishyjoke", "squidpun", "squiddypun", "squidjoke", "squiddyjoke"
];

// Replace a regular message with a message sent through a webhook with the OP's name and avatar
async function replaceMessageThroughWebhook(message, resend_content) {
    if (message.channel.id !== "758541031498317835") {
        if (message.channel.type !== "dm") {
            message.delete();
        }
        const webhooks = await message.channel.fetchWebhooks();
        const webhook = webhooks.filter(w => w.owner.id === message.client.user.id).first();

        let member = message.guild.member(message.author);
        let nickname = member ? member.displayName : null;
        let avatar = message.author.displayAvatarURL();

        if (webhook === undefined) {
            // No webhook exists in this channel, so create one
            message.channel.createWebhook("Nira-chan")
            .then(webhook => {
                // Resend the message with the OP's avatar and display name
                webhook.send(resend_content, {
                    username: nickname,
                    avatarURL: avatar
                });
            }) .catch(console.error);
        } else {
            // Resend the message with the OP's avatar and display name
            webhook.send(resend_content, {
                username: nickname,
                avatarURL: avatar
            });
        }
    }
}
function findEmoji(client, message, emojiName) {
    if (message.channel.type !== "dm") {
        var nameFn = emoji => emoji.name.toLowerCase() === emojiName.toLowerCase();
        var match = message.guild.emojis.cache.find(nameFn);
        if (!match) {
            match = client.guilds.cache.flatMap(guild => guild.emojis.cache).find(nameFn);
        }
        return match;
    }
}

// Embeds
function getSimpleEmbed(color, title, author, description) {
    return new MessageEmbed()
        .setColor(color)
        .setTitle(title)
        .setAuthor(author.username, author.avatarURL({ dynamic: true }))
        .setDescription(description);
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
    // Welcome Message and Role
    if (message.type === "GUILD_MEMBER_JOIN" && message.guild.id === homeguild) {
        const list = client.guilds.cache.get(homeguild);
        var newbiesRole = list.roles.cache.find(role => role.name === "Newbies");
        if (!message.author.bot) {
            message.member.roles.add(newbiesRole);
        }

        const channel = client.channels.cache.get("603246092402032673");
        channel.send(emojis.wave).then(() => {
            if (Math.random() < 1/100) {
                const embed = new MessageEmbed()
                .setDescription(`Attention all ZUTOMAYO stans!\n<@${client.user.id}> is in trouble! She needs your help to pay for intensive therapy to relieve the burdens of her past traumas.\nAll she needs is your mum's credit card number, the expiration date, and those 3 *wacky* numbers on the back!\nHurry, and click that shiny 'Server Boost' button **__NOW__!** <:niragun:772343025099603988>`)
                .setColor(15849719);
                channel.send(embed);
            }
        });
    }
    if (message.type === ("USER_PREMIUM_GUILD_SUBSCRIPTION" || "USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_1" || "USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_2" || "USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_3")) {
        message.channel.send("Thank you so much! <:niraStar:777740701441064960>")
    }

    // Counting
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

    // Grey
    else if (message.mentions.users.has(members.nirachanactual) && message.author.id === members.grey) {
        var greyResponses = [
            "Long time no see.", "What's up?", "Can I call you today?", "You're awake!", "I want to be with you.",
            "I miss you.", "I love you.", "Aren't you dead?!", "I don't want to study anymore...", "Take my sad love.",
            "Come home to me.", "Don't forget me.", "Why won't you answer my calls?"
        ]
        const response = greyResponses[Math.floor(Math.random() * greyResponses.length)];
        message.channel.startTyping();
        setTimeout(function () {
            message.channel.stopTyping();
            message.channel.send(`<@${members.grey}>, ${response}`);
        }, 3000);
    }

    // Bot Check
    else if (message.webhookID || message.author == client.user || message.author.bot) {
        for (let embed of message.embeds) {
            if (embed.title === (`-wolfram <query>`) && (message.channel.id === "758523806507204608" || message.channel.id === "762068348870852709")) {
                message.delete();
            }
        }
        return;
    }

    // UWU-ify Channel
    if (message.channel.id === "696143475954941962" || message.channel.id === "786321508527243324") {
        var str = message.content;
        uwuifying.custom(str, message).then(() => message.delete());
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
    const emoji_regexp = /<a?:\w+:\d+>|(?<!\\):(\w+):|^-(\w+)$/g;
    var needs_resend = false;

    // Replaces emoji names with GIF emoji
    function replaceEmoji(match, group1, group2) {
        let emojiMatch = group1 || group2;
        if (emojiMatch) {
            let emoji = findEmoji(client, message, emojiMatch);
            if (emoji) {
                // We only need to resend if we replace any animated emoji
                needs_resend = needs_resend || emoji.animated || emoji.guild.id !== message.guild.id;
                let type = emoji.animated ? "a" : "";
                return `<${type}:${emoji.name}:${emoji.id}>`;
            }
        }
        return match;
    }

    const fishyChannel = "747201864889794721";
    let resend_content = message.content.replace(emoji_regexp, replaceEmoji);
    if (needs_resend && message.member && message.channel.id !== fishyChannel) {
        // If there were any GIF emoji added to the message
        await replaceMessageThroughWebhook(message, resend_content);
    }
          
    // PatPat Command
    // Allowed in specific bot channels only
    if (message.channel.type === "dm" || allowlists.botspamchannels.includes(message.channel.id) || message.guild.id !== homeguild || message.member.roles.cache.get(zoneRoles.botPass)) {
        if (message.content.toLowerCase() === `${prefix}${commandNames.patpatstart.name}`) {
            // PatPat: start new conversations
            whosTalkingWithPatPat.add(message.author.id);

            if (members.friendsofnira9000.includes(message.author.id)) {
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

            if (members.friendsofnira9000.includes(message.author.id)) {
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
    if (message.channel.id === fishyChannel) {
        let starts_with_command = fishyCommands.some(word => message.content.toLowerCase().startsWith(`${prefix}`+word));

        if (starts_with_command) {
            return;
        }
        else message.delete();
    }
    if (message.channel.id === "456367532434128897" && message.author.id === "238386015520292866") {
        let starts_with_command = fishyCommands.some(word => message.content.toLowerCase().startsWith(">"+word));

        if (starts_with_command || message.content.startsWith(">")) {
            message.react("771179684851089458");
        }
        else if (!message.content.startsWith(`${prefix}uwu`) && !message.mentions.users.has(client.user.id)) {
            var str = message.content;
            uwuifying.custom(str, message);
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

    // Death of Nira
    const testingNira = "764990952510717973";
    const niraWave = emojis.wave.replace(/\D/g, "");
    if (message.mentions.users.has(testingNira)) {
        const filter = (reaction, user) => user.id === testingNira && reaction.emoji.id === niraWave;

        message.awaitReactions(filter, { max: 1, time: 3500 })
        .then((collected) => {
            if (!collected.size) {
                message.react("756582453824454727");
            }
        });
    }

    // Responses
    if (message.content.toLowerCase().includes("poyo")) {
        if (message.content.toLowerCase() === ("poyo" || "poyo!") || Math.random() < 1/2) {
            message.channel.send("Poyo!");
        }
    }
    const winemoji = "802352890571653170"
    var paladinResponses = [
        "decant", "grand paladin", `<:1945grandpaladin:${winemoji}>`
    ]
    let isPaladin = paladinResponses.some(word => message.content.toLowerCase().includes(word.toLowerCase()));
    if (isPaladin) {
        if (message.content === "Decant.") {
            message.react("🇩")
            .then (() => message.react("🇪"))
            .then (() => message.react("🇨"))
            .then (() => message.react("🇦"))
            .then (() => message.react("🇳"))
            .then (() => message.react("🇹"));
        }
        else {
            message.react(winemoji);
            if (Math.random() < 1/10) {
                const embed = new MessageEmbed()
                .setDescription("It is perfection. Irreplaceable. You don't drink the **1945 Grand Paladin** anymore than you'd write a shopping list on the Mona Lisa!")
                .setColor(15849719);
                message.channel.send(embed);
            }
        }
    }
    var noUResponses = [
        "no u", "yesn't men't", "nay thee", "[Rn] 5f¹⁴7s² × [Rn] 5f³6d¹7s²", "n-nyo u~wu",
        "Nobelium Uranium", "non tu", "no vos", "102 + 92", "`6e 6f 20 75`", "🇳 🇴  🇺", "ノユ",
        "∩O ∪", "∩∅ ∪", "`01101110 01101111 00100000 01110101`", "`-. --- / ..-`",
        "`110 111 32 117`", "`&#110;&#111;&#32;&#117;`", "ⁿᵒ ᵘ"
    ]
    let isNoU = noUResponses.some(word => message.content.toLowerCase() === word.toLowerCase());
    if (isNoU && (Math.random() < 1/3 || members.noutimesinfinity.includes(message.author.id))) {
        const response = noUResponses[Math.floor(Math.random() * noUResponses.length)];
        message.channel.send(response);
    }

    // Server Rules
    if (message.channel.type !== "dm" && message.guild.id === homeguild) {
        if (message.member && message.member.roles.cache.get("742061218860236840")) {
            rules.filter(rule => rule.re.test(message.content))
                .map(rule => new MessageEmbed()
                .setColor(15849719)
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