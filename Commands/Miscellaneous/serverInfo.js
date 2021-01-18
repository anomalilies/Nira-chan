const Commando = require("discord.js-commando");
const serverInfoEmbed = require("../../Embeds/serverInfoEmbed");

module.exports = class AboutCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: "serverinfo",
            aliases: ["about"],
            group: "misc",
            memberName: "about",
            description: "Find out about the server you're in."
        });
    }

    async run(message) {
        if (message.channel.type !== "dm") {
            message.channel.send(serverInfoEmbed(message.guild));
        } else {
            message.channel.send("You can't use this command here, silly!");
        }
    }
};
