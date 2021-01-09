const Commando = require("discord.js-commando");
const configFileName = process.env.NIRA_DEV ? 'config.dev.json' : 'config.json';
const { members } = require(`../../${configFileName}`);
//const { MessageEmbed } = require("discord.js");

module.exports = class EditCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: "edit",
            group: "misc",
            memberName: "edit",
            description: "Edit one of Nira-chan's messages!",
            args: [
                {
                    key: 'id',
                    prompt: 'What is the ID of the message would you like to edit?',
                    type: 'string',
                },
            ],
            ownerOnly: true
        });
    }

    async run(message, { id }) {
        const channel = message.guild.channels.cache.find(
            channel => channel.id === message.channel.id);
        channel.messages.fetch(id).then(msg => {
            if (id.match(/^\d{18}$/) && msg.author.id === members.nirachanactual) {
                message.channel.send(id);
            }
            else {
                message.channel.send("<:nirangy:777736569746227211>");
            }
        });
    }
};