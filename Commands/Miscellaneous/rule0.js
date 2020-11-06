const { Command } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");

module.exports = class Rule0Command extends Command {
    constructor(client) {
        super(client, {
            name: "0",
            group: "misc",
            memberName: "0",
            description: "Provide another user with some much-welcome encouragement!",
        });    
    }

    run(message) {
        const rule0 = new MessageEmbed()
        .setTitle("(Secret Rule) 0. Be Kind to Yourself")
        .setDescription(
            "We care for you, so stop beating yourself up!\nNot everything is your fault, so please keep trusting"
            + " yourself, and our respect and love for you.");
        message.channel.send(rule0);
    }
};