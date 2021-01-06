const Commando = require("discord.js-commando");
const configFileName = process.env.NIRA_DEV ? 'config.dev.json' : 'config.json';
const { allowlists, emojis, zoneRoles } = require(`../../${configFileName}`);
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
        if (message.channel.type === "dm" || allowlists.botspamchannels.includes(message.channel.id) || message.channel.type === "dm" || message.member.roles.cache.get(zoneRoles.botPass)) {
            const stabstabstab = new MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic:true}))
            .setColor(15849719)
            .setDescription(
                `pokepokepoke ${emojis.fencing}`);
            message.channel.send(stabstabstab);
        }
    }
};