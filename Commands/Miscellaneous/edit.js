const Commando = require("discord.js-commando");
const configFileName = process.env.NIRA_DEV ? "config.dev.json" : "config.json";
const { members } = require(`../../${configFileName}`);

module.exports = class EditCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: "edit",
            group: "misc",
            memberName: "edit",
            description: "Edit one of Nira-chan's messages!",
            args: [
                {
                    key: "id",
                    prompt: "What is the ID of the message would you like to edit?",
                    type: "string",
                },
                {
                    key: "channelID",
                    prompt: "What channel is your target message in? If you're unsure, respond with `N/A`.",
                    type: "string",
                }
            ],
            ownerOnly: true
        });
    }

    async run(message, { id, channelID }) {
        if (id.match(/^\d{18}$/)) {
            var targetMsg = "";

            if (channelID.toUpperCase() === "N/A") {
                const channels = message.guild.channels.cache.filter(c => c.type === "text").array();
                for (let index of channels) {
                    await index.messages.fetch(id).then(msg => {
                        targetMsg = msg;
                    }).catch(err => {});
                }
            }
            else {
                const channel = channelID.split(/(\d+)/)
                if (channel[1].match(/^\d{18}$/)) {
                    let targetChannel = message.guild.channels.cache.get(channel[1]);
                    targetMsg = await targetChannel.messages.fetch(id);
                }
            }
            
            if (targetMsg.id.match(/^\d{18}$/) && targetMsg.author.id === members.nirachanactual) {
                message.channel.send(`<@${message.author.id}>, What would you like the new message to say?`+"\nRespond with `cancel` to cancel the command. The command will automatically be cancelled in 30 seconds.");
                const filter = m => m.author.id === message.author.id;

                message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ["time"] })
                .then((collected) => {
                    let text = collected.first().content;

                    if (text.toLowerCase() !== "cancel") {
                        targetMsg.edit(text);
                    }
                    else {
                        message.channel.send(`<@${message.author.id}>, Cancelled command.`);
                    }
                }).catch(err => {});
            }
        }
    }
};