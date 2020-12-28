const Commando = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");
const { homeguild } = require("../../config.json");

// Embeds
function getSimpleEmbed(title, description) {
    return new MessageEmbed()
        .setColor(15849719)
        .setTitle(title)
        .setDescription(description);
}

const nirahello = "777736555829002281";
const niracute = "788632707789225985";

var inviteClient = {};

module.exports = class InviteCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: "invite",
            group: "misc",
            memberName: "invite",
            description: "Get an invite for the server/bot!"
        });

        inviteClient = client;
    }

    async run(message) {
        const embed = getSimpleEmbed (
            "Bot Invitation",
            `Click __**[here](https://discord.com/api/oauth2/authorize?client_id=${inviteClient.user.id}&permissions=805661760&scope=bot)**__ to invite <@${inviteClient.user.id}>!`
        );

        message.channel.send(embed).then(async msg => {
            const botInvite = getSimpleEmbed (
                "Bot Invitation",
                `Click __**[here](https://discord.com/api/oauth2/authorize?client_id=${inviteClient.user.id}&permissions=805661760&scope=bot)**__ to invite <@${inviteClient.user.id}>!`
            );

            if (msg.channel.type !== "dm" && msg.guild.id === homeguild) {
                const newEmbed = getSimpleEmbed (
                    "Invitation",
                    `Would you like to **invite <@${inviteClient.user.id}> to a server** (<:nirahello:${nirahello}>),\nor **share ${msg.guild.name}'s invite link** (<:niracute:${niracute}>)?`
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
			    })
            }
            else {
                setTimeout(() => {
                    msg.edit(botInvite);
                }, 1000);
            }
        }
    )}
};