const Commando = require("discord.js-commando");
const { allowlists } = require("../../config.json");
const { MessageEmbed } = require("discord.js");

module.exports = class AddCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: "akinator",
            aliases: ["acanetor", "acaねtor"],
            group: "fun",
            memberName: "akinator",
            description: "Akinator... But with ACAね for once!",
        })
    }

    async run(message) {
        if (allowlists.botspamchannels.includes(message.channel.id)) {
            const embed = new MessageEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic:true}))
                .setDescription(
                    `I'm ${Math.floor(Math.random() * (99-75+1)+75)}% sure your character is...\n\nACAne (Singer)`
                )
                .setThumbnail("https://raw.githubusercontent.com/anomalilies/Nira-chan/master/Images/ACAne.png")
                .setFooter("Is this correct? (yes/no)")
                .setColor(240116);
            message.channel.send(embed);
            }
    }
}