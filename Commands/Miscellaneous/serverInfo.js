const Commando = require("discord.js-commando");
const serverInfoEmbed = require("../../Embeds/serverInfoEmbed");

module.exports = class AboutCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: "serverinfo",
            aliases: ["about"],
            group: "misc",
            memberName: "about",
            description: "Find out about the server!",
        });
    }

    async run(message) {
        message.channel.send(serverInfoEmbed(message.guild));
    }
};