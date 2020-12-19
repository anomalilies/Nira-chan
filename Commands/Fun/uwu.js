const Commando = require("discord.js-commando");
var uwuifying = require("./UWU Translator/uwuify");

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
        uwuifying.custom(text, message).then(() => {
            if (message.channel.type !== "dm") {
                    setTimeout(function() {
                    message.delete();
                }, 4000);
            }
        })
    }
};