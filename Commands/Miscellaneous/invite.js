require("dotenv").config();
const Commando = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");
const configFileName = process.env.NIRA_DEV ? 'config.dev.json' : 'config.json';
const { homeguild } = require(`../../${configFileName}`);

// Embeds
function getSimpleEmbed(title, description) {
    return new MessageEmbed()
        .setColor(15849719)
        .setTitle(title)
        .setDescription(description);
}

const nirahello = "777736555829002281";
const niracute = "788632707789225985";

module.exports = class InviteCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: "invite",
            group: "misc",
            memberName: "invite",
            description: "Get an invite for the server/bot!"
        });
    }

    async run(message) {
        const embed = getSimpleEmbed (
            "Loading...",
            "<a:loading:791389606616236052>"
        );

        message.channel.send(embed).then(async msg => {
            const botInvite = getSimpleEmbed (
                "Bot Invitation",
                `Click __**[here](https://discord.com/api/oauth2/authorize?client_id=${this.client.user.id}&permissions=805661760&scope=bot)**__ to invite <@${this.client.user.id}>!`
            );

            if (msg.channel.type !== "dm" && msg.guild.id === homeguild) {
                const newEmbed = getSimpleEmbed (
                    "Invitation",
                    `Would you like to **invite <@${this.client.user.id}> to a server** (<:nirahello:${nirahello}>),\nor **share ${msg.guild.name}'s invite link** (<:niracute:${niracute}>)?`
                );
                msg.edit(newEmbed)
                .then(msg.react(`${nirahello}`).then(msg.react(`${niracute}`)));

                const filter = (reaction, user) => [`${nirahello}`, `${niracute}`].includes(reaction.emoji.id) && user.id === message.author.id;
                const reactions = msg.awaitReactions(filter, {
                    max: 1,
				    time: 60000
			    }).then(reactions => {
                    if (reactions.has(`${nirahello}`)) {
                        msg.edit(botInvite)
                        .then(msg.reactions.removeAll());
                    } else if (reactions.has(`${niracute}`)) {
                        msg.channel.send("https://discord.gg/htSDkHH")
                        .then(msg.reactions.removeAll());
                    }
			    });
            }
            else {
                setTimeout(() => {
                    msg.edit(botInvite);
                }, 1000);
            }
        }
    );
}};