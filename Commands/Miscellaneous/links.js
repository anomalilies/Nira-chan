const Commando = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");
const configFileName = process.env.NIRA_DEV ? 'config.dev.json' : 'config.json';
const { emojis, themechannels, members, homeguild } = require(`../../${configFileName}`);

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
                },
                {
                    key: "check",
                    prompt: "Is this link for a concert? (y/n)",
                    type: "string",
                    validate: check => {
                        const validArgs = ["n", "no", "y", "yes"]
                        if (validArgs.some(word => check.toLowerCase() === word)) return true;
                        return "Incorrect syntax.";
                    }
                }
            ],
            guildOnly: true
        });
    }

    async run(message, { title, description, check }) {
        if (message.guild.id === homeguild && check.toLowerCase()) {
            const embed = new MessageEmbed()
                .setTitle(title)
                .setDescription(description)
                .setColor(15849719);

            if (check.toLowerCase() === ("n" || "no") ) {
                if (message.channel.id === "745410767574007811") {
                    const { guild } = message;
                    const channel = guild.channels.cache.get("742069780328087613");
                    channel.send(embed);
    
                    message.channel.send("Successfully created embed!");
                }
                else if (message.author.id === members.currentowner) {
                    const faqEmbed = new MessageEmbed()
                        .setTitle(title)
                        .setDescription(description)
                        .setColor(15849719);

                    const { guild } = message;
                    const channel = guild.channels.cache.get("760621183564513312");
                    channel.send(faqEmbed).then(channel.send(emojis.spacer));

                    message.channel.send("Successfully created embed!");
                }
                else { message.channel.send("<:nirangy:777736569746227211>") }
            }
            else {
                message.guild.members.fetch(members.currentowner).then((user) => {
                    user.send(embed);
                });
                message.channel.send(`Your link is currently being checked over by Lily, and will be added to <#${themechannels.links}> shortly!`);
            }
        }
    }
};