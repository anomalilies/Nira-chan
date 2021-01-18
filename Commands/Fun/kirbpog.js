const Commando = require("discord.js-commando");

module.exports = class KirbPogCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: "kirbpog",
            group: "fun",
            memberName: "kirbpog",
            description: "Poggers."
        });
    }

    async run(message) {
        message.channel.send(
            "<:kirbsucc:757289104789471322> <:poggers:764300262290358282>\n<:kirbful:757290594618966146>\n<:kirbpog:764299282664521729>"
        );
    }
};
