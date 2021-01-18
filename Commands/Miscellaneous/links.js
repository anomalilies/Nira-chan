const Commando = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");
const linksChannel = "742069780328087613";
const configFileName = process.env.NIRA_DEV ? "config.dev.json" : "config.json";
const { emojis } = require(`../../${configFileName}`);

module.exports = class LinkCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: "link",
            group: "misc",
            memberName: "link",
            description: "Embed a link.",
            args: [
                {
                    key: "title",
                    prompt: "What would you like the title to be?",
                    type: "string"
                },
                {
                    key: "description",
                    prompt: "Paste the link here!",
                    type: "string"
                }
            ]
        });
    }

    async run(message, { title, description }) {
        if (message.channel.type === "dm") {
            message.channel.send("You can't use this command here, silly!");
        } else if (message.channel.id === "745410767574007811") {
            const embed = new MessageEmbed().setTitle(title).setDescription(description).setColor(15849719);

            const { guild } = message;
            const channel = guild.channels.cache.get(linksChannel);
            channel.send(embed);

            const replyEmbed = new MessageEmbed()
                .setTitle(`Sucessfully created embed!`)
                .setDescription(`Your embed can be found on ${channel}!`)
                .setColor(15849719);
            message.channel.send(replyEmbed);
        } else if (message.channel.id === "760621183564513312") {
            const faqEmbed = new MessageEmbed().setTitle(title).setDescription(description).setColor(15849719);
            message.channel.send(faqEmbed).then(message.channel.send(emojis.spacer));
        }
    }
};
