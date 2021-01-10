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
        message.channel.messages.fetch(id).then(targetMsg => targetMsg.edit('testingNyiwa'));
        /*const channels = message.guild.channels.cache.filter(c => c.type === "text").array();
        for (let index of channels) {
            await index.messages.fetch(id).then(targetMsg => {
                if (id.match(/^\d{18}$/) && targetMsg.author.id === "764990952510717973") {
                    message.channel.send(`<@${message.author.id}>, What would you like the new message to say?`);
                    message.channel.awaitMessages({ max: 1, time: 30000, errors: ["time"] })
                    .then((collected) => {
                        targetMsg.edit(collected.first());
                    });
                }
                else {
                    message.channel.send("<:nirangy:777736569746227211>");
                }
            }).catch(err => {});
        }*/
    }
};