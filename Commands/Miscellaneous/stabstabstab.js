const { Command } = require("discord.js-commando");
const { emojis } = require("../../config.json");
const { MessageEmbed } = require("discord.js");

module.exports = class FencingCommand extends Command {
    constructor(client) {
        super(client, {
            name: "stabstabstab",
            aliases: ["stab", "fence", "fencing"],
            group: "misc",
            memberName: "stabstabstab",
            description: "Go fencing!",
        });    
    }

    run(message) {
        const stabstabstab = new MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic:true}))
        .setColor(15849719)
        .setDescription(
            `pokepokepoke ${emojis.fencing}`);
        message.channel.send(stabstabstab);
    }
};