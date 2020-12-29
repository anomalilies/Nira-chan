const Commando = require("discord.js-commando");
const { homeguild, allowlists, emojis } = require("../../config.json");
const { MessageEmbed } = require("discord.js");
const abilities = require("../../Data/copyabilities.json");

module.exports = class KirbyCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: "kirby",
            aliases: ["kirb", "copyability"],
            group: "fun",
            memberName: "kirby",
            description: "What ability would Kirby get if he inhaled you?",
        });
    }

    async run(message) {
        if (message.channel.type === "dm" || allowlists.botspamchannels.includes(message.channel.id) || message.guild.id !== homeguild) {
            const index = Math.floor(Math.random() * abilities.length);
            const embed = new MessageEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic:true}))
                .setDescription(`<:kirbsucc:757289104789471322>Kirby inhaled ${message.author.username} and got the ${abilities[index]} ability!`)
                .setColor(15849719);
            message.channel.send(embed);
        }
    }
};