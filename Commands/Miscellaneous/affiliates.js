const Commando = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");
const configFileName = process.env.NIRA_DEV ? "config.dev.json" : "config.json";
const { homeguild, emojis } = require(`../../${configFileName}`);
const affiliatesChannel = "758082713885343844";

module.exports = class AffiliatesCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: "affiliate",
            group: "misc",
            memberName: "affiliate",
            description: "Embed an affiliates link.",
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
                },
                {
                    key: "link",
                    prompt: "Paste the link here!",
                    type: "string"
                }
            ],
            ownerOnly: true
        });
    }

    async run(message, { title, description, link }) {
        if (message.channel.type === "dm") {
            message.channel.send("You can't use this command here, silly!");
        } else if (message.guild.id === homeguild) {
            const embed = new MessageEmbed().setTitle(title).setDescription(description).setColor(15849719);

            const { guild } = message;
            const channel = guild.channels.cache.get(affiliatesChannel);
            channel.send(embed).then(channel.send(link)).then(channel.send(emojis.spacer));
        }
    }
};
