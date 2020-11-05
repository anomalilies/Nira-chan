const Discord = require("discord.js");

module.exports = {
    commands: "0w0",
    callback: (message) => {
        const rule0w0 = new Discord.MessageEmbed()
            .setTitle("(Swecrwet Rwulwe) 0w0. Bwe Kwind to Youwsewf")
            .setDescription(
                "We cawe fow ywou, so stwop byeatwing youwsewf up. (・`ω´・)\nNyot evewything is youw fauwt, so "
                + "pwease keep twusting youwsewf, and ouw wespect and wuv fow you.");
        message.channel.send(rule0w0);
    },
}