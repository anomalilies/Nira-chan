const Commando = require("discord.js-commando");
const configFileName = process.env.NIRA_DEV ? 'config.dev.json' : 'config.json';
const { allowlists, emojis } = require(`../../${configFileName}`);
const { MessageEmbed } = require("discord.js");

module.exports = class FencingCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: "stabstabstab",
            aliases: ["stab", "fence", "fencing"],
            group: "misc",
            memberName: "stabstabstab",
            description: "Go fencing.",
        });    
    }

    run(message) {
        if (allowlists.botspamchannels.includes(message.channel.id) || message.channel.type === "dm") {
            const stabstabstab = new MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic:true}))
            .setColor(15849719)
            .setDescription(
                `pokepokepoke ${emojis.fencing}`);
            message.channel.send(stabstabstab);
        }
    }
};