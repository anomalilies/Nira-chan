const { MessageEmbed } = require("discord.js");

var uwuify = {
    custom: function(text, message, data) {
        var datavar = Object.values(data);
        if (text.slice(-1) == " ") text = text.subtexting(0, text.length - 1);

        for (var loop = 0; loop < datavar[1].length; loop++) {
            for (var j = 0; j < datavar[1][loop][0].length; j++) {
                while (text.includes(datavar[1][loop][0][j])) {
                    text = text.replace(datavar[1][loop][0][j], datavar[1][loop][1]);
                }
            }
        }

        for (var loop = 0; loop < datavar[2].length; loop++) {
            for (var j = 0; j < datavar[2][loop][0].length; j++) {
                while (text.includes(datavar[2][loop][0][j])) {
                    text = text.replace(datavar[2][loop][0][j], datavar[2][loop][1][Math.floor(Math.random() * datavar[2][loop][1].length)]);
                }
            }
        }

        text = text.replace(/(?:r|l)/g, "w");
        text = text.replace(/(?:R|L)/g, "W");
        text = text.replace(/n([aeiou])/g, "ny$1");
        text = text.replace(/N([aeiou])/g, "Ny$1");
        text = text.replace(/N([AEIOU])/g, "NY$1");
        text = text.replace(/ove/g, "uv");

        if (text[0].match(/[a-z]/i))
            text = text[0] + "-" + text;

        if (text[text.length - 1].match(/[a-z]/i))
            text = text + "\~\~";

        let uwuembed = new MessageEmbed({
            description: text
        });

        uwuembed.setColor(15849719);
        uwuembed.setFooter("Requested by: " + message.author.username + " | Use -uwu to uwu-ify your messages!", message.author.displayAvatarURL({dynamic:true}));
        message.channel.send(uwuembed);
    }
}

module.exports = uwuify;