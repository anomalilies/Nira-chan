const Commando = require("discord.js-commando");
const { allowlists, emojis } = require("../../config.json");
const { MessageEmbed } = require("discord.js");

module.exports = class WriteCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: "dearmrf",
            aliases: ["write"],
            group: "misc",
            memberName: "dearmrf",
            description: "Write your own personal letter to Mr. F.",
            args: [
                {
                    key: 'text',
                    prompt: 'What would you like to write?',
                    type: 'string',
                },
            ]
        })
    }

    async run(message, { text }) {
        if (allowlists.botspamchannels.includes(message.channel.id)) {
            const embed = new MessageEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic:true}))
                .setDescription(text)
                .addFields({
                    name: "Your Response:", value: `Mr. F, I have no idea what **${message.author}** is saying, but something `
                    + `tells me you best pay really close attention! ${emojis.wince}`
                })
                .setColor(15849719);
            message.channel.send(embed);
            }
    }
}