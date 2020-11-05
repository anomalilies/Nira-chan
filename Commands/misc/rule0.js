const Discord = require("discord.js");

module.exports = {
    commands: "0",
    callback: (message) => {
        if (message.content.toLowerCase().includes("0w0")) {
            return;
        }
        else {
            const rule0 = new Discord.MessageEmbed()
            .setTitle("(Secret Rule) 0. Be Kind to Yourself")
            .setDescription(
                "We care for you, so stop beating yourself up!\nNot everything is your fault, so please keep trusting"
                + " yourself, and our respect and love for you.");
        message.channel.send(rule0);
        }
    },
}