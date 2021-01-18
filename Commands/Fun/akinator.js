const Commando = require("discord.js-commando");
const configFileName = process.env.NIRA_DEV ? "config.dev.json" : "config.json";
const { allowlists, zoneRoles } = require(`../../${configFileName}`);
const { MessageEmbed } = require("discord.js");
const yes = "✅";
const no = "❎";

module.exports = class AddCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: "akinator",
            aliases: ["acanetor", "acaねtor"],
            group: "fun",
            memberName: "akinator",
            description: "Akinator... But with ACAね for once!"
        });
    }

    async run(message) {
        if (
            message.channel.type === "dm" ||
            allowlists.botspamchannels.includes(message.channel.id) ||
            message.member.roles.cache.get(zoneRoles.botPass)
        ) {
            function getSimpleEmbed(description, footer, thumbnail) {
                return new MessageEmbed()
                    .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                    .setColor(240116)
                    .setDescription(description)
                    .setFooter(footer)
                    .setThumbnail(thumbnail);
            }
            var random = Math.floor(Math.random() * (99 - 75 + 1) + 75);

            const ACAneEmbed = getSimpleEmbed(
                `I'm ${random}% sure your character is...\n\nACAね (Singer)`,
                `Is this correct? (${yes}/${no})`,
                "https://raw.githubusercontent.com/anomalilies/Nira-chan/master/Images/ACAne.png"
            );
            const dimeloEmbed = getSimpleEmbed(
                "I'm 100% sure your character is...\n\nDimelo Tony (Musician)",
                "You have no choice in the matter; This is correct.",
                "https://raw.githubusercontent.com/anomalilies/Nira-chan/master/Images/Dimelo%20Tony.jpg"
            );
            const correctEmbed = new MessageEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                .setDescription("Great! I guessed correctly. I love playing with you!")
                .setColor(6732650);

            message.channel.send(ACAneEmbed).then(async (msg) => {
                msg.react(yes).then(msg.react(no));
                const filter = (reaction, user) =>
                    [yes, no].includes(reaction.emoji.name) && user.id === message.author.id;
                const reactions = msg
                    .awaitReactions(filter, {
                        max: 1,
                        time: 30000
                    })
                    .then((reactions) => {
                        if (msg.channel.type !== "dm") {
                            msg.reactions.removeAll();
                        }
                        if (reactions.has(yes)) {
                            msg.edit(correctEmbed);
                        } else if (reactions.has(no)) {
                            msg.edit(dimeloEmbed);
                        }
                    });
            });
        }
    }
};
