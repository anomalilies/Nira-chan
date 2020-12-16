const Commando = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");
const { emojis } = require("../../config.json");
const FAQChannel = "760621183564513312";

module.exports = class FAQCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: "faq",
            group: "misc",
            memberName: "faq",
            description: "Create a FAQ embed.",
            args: [
                {
                    key: "title",
                    prompt: "What would you like the title to be?",
                    type: "string"
                },
                {
                    key: "description",
                    prompt: "What would you like the description to be?",
                    type: "string"
                }
            ],
            ownerOnly: true
        });
    }

    async run(message, { title, description }) {
        if (message.guild.id === "603246092402032670") {
            const embed = new MessageEmbed()
            .setTitle(title)
            .setDescription(description)
            .setColor(15849719);

            const { guild } = message;
            const channel = guild.channels.cache.get(FAQChannel);
            channel.send(embed)
            .then (channel.send(emojis.spacer));
        }
    }
};