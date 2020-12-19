const Commando = require("discord.js-commando");
const { fishpuns, allowlists } = require("../../config.json");
const { MessageEmbed } = require("discord.js");

module.exports = class FishPunCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: "fishpun",
            aliases: ["fishypun", "fishjoke", "fishyjoke", "squidpun", "squiddypun", "squidjoke", "squiddyjoke"],
            group: "fun",
            memberName: "fishpun",
            description: "Something seems... *Fishy*.",
        });
    }

    async run(message) {
        if (allowlists.botspamchannels.includes(message.channel.id) || message.guild.id !== "603246092402032670" || message.channel.type === "dm") {
            const index = Math.floor(Math.random() * fishpuns.length);
            const embed = new MessageEmbed()
                .setTitle("Mr. Fish says...")
                .setThumbnail("https://raw.githubusercontent.com/anomalilies/Nira-chan/master/Images/Fishy.jpg")
                .setDescription(`${fishpuns[index]}`)
                .setColor(15849719);
            message.channel.send(embed);
        }
    }
};