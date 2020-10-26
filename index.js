require("dotenv").config();
const cron = require("cron");
const Discord = require("discord.js");
const client = new Discord.Client();
const { prefix, commands, allowlists, emojis, patpatresponses, nira9000 } = require("./config.json");
const rules = require("./Embeds/ruleEmbeds.json");

/*
For creating/editing embeds:
const botEmbeds = require("./Embeds/botEmbeds");
const roleslistEmbeds = require("./Embeds/roleslistEmbeds");

const botCommands = require("./Commands/botCommands");
const roleslistCommands = require("./Commands/roleslistCommands");
const ruleCommands = require("./Commands/ruleCommands");
*/

const ruleEmbeds = require("./Embeds/ruleEmbeds");
var uwuifying = require("./UWU Translator/uwuify.js");
var data = require("./UWU Translator/data");

var message_global;
var whosTalkingWithPatPat = new Set();
var channelTitles = [
    "Byoushin wo Kamu", "Nouriueno Cracker", "Humanoid", "Mabushii DNA Dake", "Seigi", "Kettobashita Moufu",
    "Konnakoto Soudou", "Haze Haseru Haterumade", "Dear Mr. 'F'", "Obenkyou Shitoiteyo", "MILABO", "Fastening", "Ham"
];
var fishyCommands = [
    "fishy", "fishytimer", "fishystats", "leaderboardfishy", "fish", "fihy", "fisy", "foshy", "fisyh", "fsihy", "fin",
    "fintimer", "fisytimer", "foshytimer", "ft", "finstats", "fisystats", "foshystats", "fs", "leaderboardfishysize"
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

// Ready Event
client.once("ready", () => {
    console.log(`${client.user.tag} activated!`);
    setInterval(statusChange, 30000);

    /*
    For creating/editing embeds:
    botCommands(client, "742548177462231120");
    roleslistCommands(client, "758494476174884905");
    ruleCommands(client, "603248229928140801");
    */
});

// Monthly Server Themes
const scheduledMessage = new cron.CronJob("0 0 1 * *", () => {
    const channel = client.channels.cache.find(channel => channel.id === "767550623767068742");
    const random = Math.floor(Math.random() * channelTitles.length);
    channel.setName(channelTitles[random]);
}, null, true, "Etc/UTC");
scheduledMessage.start();

// Welcome Message
client.on("guildMemberAdd", member => {
    member.guild.channels.cache.get("603246092402032673").send(`${emojis.wave}`);
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

    // Check for NiraMojis
    if (newMessage.content.includes(`${emojis.disgust}`)) {
        newMessage.react("742092526097268797");
    }
    if (newMessage.content.includes(`${emojis.stare}`)) {
        newMessage.react("742093326823587840");
    }
    if (newMessage.content.includes(`${emojis.owie}`)) {
        newMessage.react("748995687093370902")
            .then(() => newMessage.react("765005652803321856"));
    }

    // PatPat Role
    if (newMessage.member.roles.cache.get("765347466169024512")) {
        if (newMessage.content.toLowerCase().includes("patpat", `${emojis.patpat}`)) {
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
                .setDescription(`I'm ${Math.floor(Math.random() * (99-75+1)+75)}% sure your character is...\n\nACAne (Singer)`)
                .setThumbnail("https://github.com/anomalilies/Nira-chan/Images/ACAne.png")
                .setFooter("Is this correct? (yes/no)")
                .setColor(240116);
            newMessage.channel.send(embed);
        }
    }
});

// Check Messages
client.on("message", async message => {
    message_global = message;

    // Check if Author is Bot
    if (message.author == client.user || message.author.bot) {
        return;
    }

    // UWU-ify
    if (message.content.toLowerCase().startsWith(`${prefix}${commands.uwuify.name}`)) {

        var args = message.content.slice(4).trim().split(/ +/g);
        var command = args.shift();
        var str = command + " " + args.join(" ");

        uwuifying.custom(str, message, data, Discord);
    }

    // Check for NiraMojis
    if (message.channel.id === "603246659295510557") {
        if (![`${emojis.disgust}`].includes(message.content)) {
            return message.delete();
        }
    } else if (message.content.includes(`${emojis.disgust}`)) {
        message.react("742092526097268797");
    }

    if (message.channel.id === "747663718959153906") {
        if (![`${emojis.stare}`].includes(message.content)) {
            return message.delete();
        }
    } else if (message.content.includes(`${emojis.stare}`)) {
        message.react("742093326823587840");
    }

    if (message.channel.id === "750558283315544155") {
        if (![`${emojis.owie}`].includes(message.content)) {
            return message.delete();
        }
    } else if (message.content.includes(`${emojis.owie}`)) {
        message.react("748995687093370902")
            .then(() => message.react("765005652803321856"));
    }

    // PatPat Role
    if (message.member.roles.cache.get("765347466169024512")) {
        if (message.content.toLowerCase().includes("patpat", `${emojis.patpat}`)) {
            message.react("761487227921367051");
        }
    }

    // Nira Wave
    if (message.mentions.users.has(client.user.id)) {
        message.react("742394597174673458");
    }

    // Akinator Easter Egg
    // Allowed in specific bot channels only
    if (allowlists.botspamchannels.includes(message.channel.id)) {
        if(message.content.toLowerCase().startsWith("!akinator")) {
            const embed = new Discord.MessageEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic:true}))
                .setDescription(`I'm ${Math.floor(Math.random() * (99-75+1)+75)}% sure your character is...\n\nACAne (Singer)`)
                .setThumbnail("https://github.com/anomalilies/Nira-chan/Images/ACAne.png")
                .setFooter("Is this correct? (yes/no)")
                .setColor(240116);
            message.channel.send(embed);
        }
    }

    // PatPat Command
    // Allowed in specific bot channels only
    if (allowlists.botspamchannels.includes(message.channel.id)) {
        if (message.content.toLowerCase() === `${prefix}${commands.patpatstart.name}`) {
            // PatPat: start new conversations
            whosTalkingWithPatPat.add(message.author.id);

            if (message.author.id == "759338005633826817") {
                const patPatChatEmbed = getSimpleEmbed(
                    "#ffc2e8",
                    "Nira-chan has entered the chat",
                    message.author,
                    "Hewwo, Dave!~~ （＾∀＾）");

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
                    "D-Dave, this convewsation can sewve nyo puwpose anymoweu(⋟﹏⋞) Goodbyeu~");

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
                    `${nira9000[index]}`);

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
        if (message.mentions.members.first() || fishyCommands.some(word => message.content.toLowerCase().startsWith(`${prefix}`+word))) {
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
        for (let i = 1; i <= rules.length; i++) {
            if (message.content.includes(`${prefix}${i}`) && !message.content.includes("http")) {
                message.channel.send(new Discord.MessageEmbed()
                    .setTitle(rules[i - 1].title)
                    .setDescription(rules[i - 1].description)
                    .addFields({
                        name: "Moderation",
                        value: rules[i - 1].moderation
                    }));
            }
        }
    }

    // Other Commands
    let isPrefix = message.content.toLowerCase();
    if (isPrefix.startsWith("<@!" + client.user.id + "> help")) {
        let helpEmbed = new Discord.MessageEmbed()
            .setTitle(`Nira-chan's Commands`)
            .setColor(16761576)
        for (const key in commands) {
            helpEmbed.addField(`${prefix}${commands[key].name}`, `${commands[key].description}`)
        }
        message.channel.send(helpEmbed);
    } else if (message.content.toLowerCase() === `${prefix}${commands.despair.name}`) {
        message.channel.send(`Aaaa, the tape is rewinding so fast! ${emojis.despair}`);
    } else if (message.content.toLowerCase().startsWith(`${prefix}${commands.dearmrf.name}`)) {
        message.channel.send(`Mr. F, I have no idea what **${message.author.username}** is saying, but something tells me you best pay really close attention! ${emojis.wince}`);
    } else if (message.content.toLowerCase() === `${prefix}${commands.stabstabstab.name}`) {
        message.channel.send(`pokepokepoke ${emojis.fencing}`);
    }
});

client.login(process.env.CLIENT_TOKEN);
