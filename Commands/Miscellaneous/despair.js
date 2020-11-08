const Commando = require("discord.js-commando");
const { allowlists, emojis } = require("../../config.json");
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
        if (allowlists.botspamchannels.includes(message.channel.id)) {
            const embed = new MessageEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic:true}))
                .setDescription(`Aaaa, the tape is rewinding so fast! ${emojis.despair}`)
                .setColor(15849719);
            message.channel.send(embed);
            }
    }
};