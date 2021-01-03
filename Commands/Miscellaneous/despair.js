require("dotenv").config();
const Commando = require("discord.js-commando");
const configFileName = process.env.NIRA_DEV ? 'config.dev.json' : 'config.json';
const { allowlists, emojis } = require(`../../${configFileName}`);
const { MessageEmbed } = require("discord.js");

module.exports = class DespairCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: "despair",
            group: "misc",
            memberName: "despair",
            description: "Express Despair the Nira Way™️.",
        });
    }

    async run(message) {
        if (allowlists.botspamchannels.includes(message.channel.id) || message.channel.type === "dm") {
            const embed = new MessageEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic:true}))
                .setDescription(`Aaaa, the tape is rewinding so fast! ${emojis.despair}`)
                .setColor(15849719);
            message.channel.send(embed);
            }
    }
};