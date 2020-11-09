const Commando = require("discord.js-commando");
const { allowlists } = require("../../config.json");
var uwuifying = require("./UWU Translator/uwuify");
var data = require("./UWU Translator/data");

module.exports = class UWUCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: "uwu",
            group: "fun",
            memberName: "uwu",
            description: "UWU-ify your messages!",
            args: [
                {
                    key: "text",
                    prompt: "What text would you like the bot to say?",
                    type: "string"
                }
            ]
        });
    }

    async run(message, { text }) {
        if (allowlists.botspamchannels.includes(message.channel.id) || message.guild.id !== "603246092402032670") {
            message.react("771179684851089458");
            uwuifying.custom(text, message, data, Commando);
        }
    }
};