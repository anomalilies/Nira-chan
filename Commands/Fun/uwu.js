const Commando = require("discord.js-commando");
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
        uwuifying.custom(text, message, data, Commando).then(() => {
            setTimeout(function() {
                message.delete();
            }, 4000);
        })
    }
};