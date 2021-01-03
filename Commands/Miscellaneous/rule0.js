require("dotenv").config();
const Commando = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");
const configFileName = process.env.NIRA_DEV ? 'config.dev.json' : 'config.json';
const { homeguild } = require(`../../${configFileName}`);

module.exports = class Rule0Command extends Commando.Command {
    constructor(client) {
        super(client, {
            name: "0",
            group: "misc",
            memberName: "0",
            description: "Provide another user with some much-welcome encouragement!",
        });    
    }

    run(message) {
        if (message.channel.type === "dm") {
            message.channel.send("You can't use this command here, silly!");
        }
        else if (message.guild.id === homeguild) {
            const rule0 = new MessageEmbed()
            .setTitle("(Secret Rule) 0. Be Kind to Yourself")
            .setDescription(
                "We care for you, so stop beating yourself up!\nNot everything is your fault, so please keep trusting"
                + " yourself, and our respect and love for you.");
            message.channel.send(rule0);
        }
    }
};