const { MessageEmbed } = require("discord.js");
var data = require("./data");

var uwuify = {
    custom: async function(text, message) {
        var replacements = data['emotions'];
        if (text.slice(-1) == " ") text = text.subtexting(0, text.length - 1);

        for (var loop = 0; loop < replacements.length; loop++) {
            for (var j = 0; j < replacements[loop][0].length; j++) {
                while (text.includes(replacements[loop][0][j])) {
                    text = text.replace(replacements[loop][0][j], replacements[loop][1][Math.floor(Math.random() * replacements[loop][1].length)]);
                }
            }
        }

        text = text.replace(/(?!a?:\w+:\d+>*?)(r|l)(?![^<]*>)/g, "w");
        text = text.replace(/(?!a?:\w+:\d+>*?)(R|L)(?![^<]*>)/g, "W");
        text = text.replace(/(?!a?:\w+:\d+>*?)n([aeiou])(?![^<]*>)/g, "ny$1");
        text = text.replace(/(?!a?:\w+:\d+>*?)N([aeiou])(?![^<]*>)/g, "Ny$1");
        text = text.replace(/(?!a?:\w+:\d+>*?)N([AEIOU])(?![^<]*>)/g, "NY$1");
        text = text.replace(/(?!a?:\w+:\d+>*?)(ove)(?![^<]*>)/g, "uv");
        text = text.replace(/(?!a?:\w+:\d+>*?)(OVE)(?![^<]*>)/g, "UV");

        if (text[0].match(/[a-z]/i))
            text = text[0] + "-" + text;

        if (text[text.length - 1].match(/[a-z]/i))
            text = text + "\~\~";

        if (message.channel.type === "dm") {
            let embed = new MessageEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic:true}))
                .setDescription(text)
                .setColor(15849719);
            message.channel.send(embed);
        } else {
            const webhooks = await message.channel.fetchWebhooks();
            const webhook = webhooks.first();

            if (webhook === undefined) {
                // No webhook exists in this channel, so create one
                message.channel.createWebhook("Nira-chan")
                .then(webhook => {
                    // Resend the message with the OP's avatar and display name
                    webhook.send(text, {
                        username: message.member.displayName,
                        avatarURL: message.author.displayAvatarURL(),
                        files: message.attachments.array()
                    });
                })
                .catch(console.error);
            } else {
                // Resend the message with the OP's avatar and display name
                webhook.send(text, {
                    username: message.member.displayName,
                    avatarURL: message.author.displayAvatarURL(),
                    files: message.attachments.array()
                });
            }
        }
    }
};

module.exports = uwuify;
