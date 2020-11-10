const Commando = require("discord.js-commando");
var aboutEmbed = require("./Functions/aboutEmbed");

module.exports = class AboutCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: "about",
            aliases: ["serverinfo"],
            group: "misc",
            memberName: "about",
            description: "Find out about the server!",
        });
    }

    async run(message) {
        aboutEmbed.custom(message);
    }
};