var uwuify = {
    custom: async function(text, message, data) {
        var datavar = Object.values(data);
        if (text.slice(-1) == " ") text = text.subtexting(0, text.length - 1);

        for (var loop = 0; loop < datavar[1].length; loop++) {
            for (var j = 0; j < datavar[1][loop][0].length; j++) {
                while (text.includes(datavar[1][loop][0][j]) && text.match(/(?!a?:\w+:\d+>*?)(\w+)(?![^<]*>)/g)) {
                    text = text.replace(datavar[1][loop][0][j], datavar[1][loop][1][Math.floor(Math.random() * datavar[1][loop][1].length)]);
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
                    }
                );
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
};

module.exports = uwuify;