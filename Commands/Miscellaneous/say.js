const Commando = require("discord.js-commando");

module.exports = class SayCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: "say",
            group: "misc",
            memberName: "say",
            description: "Say something!",
            args: [
                {
                    key: "text",
                    prompt: "What would you like Nira to say?",
                    type: "string"
                }
            ],
            ownerOnly: true
        });
    }

    run(message, { text }) {
        message.delete();
        message.channel.send(text);
    }
};