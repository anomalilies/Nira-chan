const { Command } = require("discord.js-commando");

module.exports = class SayCommand extends Command {
    constructor(client) {
        super(client, {
            name: "say",
            group: "misc",
            memberName: "say",
            description: "Replies with the text you provide.",
            args: [
                {
                    key: "text",
                    prompt: "What text would you like the bot to say?",
                    type: "string"
                }
            ]
        });    
    }

    run(message, { text }) {
        if (message.author.id !== "228880116699103232") {
            return message.say(text);
        }
        else {
            message.delete();
            return message.say(text);
        }
    }
};