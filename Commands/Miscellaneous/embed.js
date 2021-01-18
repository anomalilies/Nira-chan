const { MessageEmbed } = require("discord.js");
const Commando = require("discord.js-commando");
const configFileName = process.env.NIRA_DEV ? "config.dev.json" : "config.json";
const { members } = require(`../../${configFileName}`);

module.exports = class EditCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: "embed",
            aliases: ["editembed"],
            group: "misc",
            memberName: "embed",
            description: "Edit one of Nira-chan's messages with an embed!",
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
                },
                {
                    key: "title",
                    prompt: "What would you like the title of the embed to be?",
                    type: "string",
                },
                {
                    key: "desc",
                    prompt: "What would you like the description of the embed to be?",
                    type: "string",
                },
                {
                    key: "fieldTitle",
                    prompt: "If you'd like to add a field, what would you like the title to be? If not, respond with `N/A`.",
                    type: "string",
                },
            ],
            ownerOnly: true
        });
    }

    async run(message, { id, channelID, title, desc, fieldTitle }) {
        const failure = `<@${message.author.id}>, Cancelled command.`;

        if (message.channel.type === "dm") {
            message.channel.send("You can't use this command here, silly!");
        }
        else if (id.match(/^\d{18}$/)) {
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
            const embed = new MessageEmbed()
            .setColor(15849719)
            .setTitle(title)
            .setDescription(desc);
            
            if (fieldTitle.toUpperCase() !== "N/A" && targetMsg.id.match(/^\d{18}$/) && targetMsg.author.id === members.nirachanactual) {
                message.channel.send(`<@${message.author.id}>, What would you like this field to contain?`+"\nRespond with `cancel` to cancel the command. The command will automatically be cancelled in 30 seconds.");
                const filter = m => m.author.id === message.author.id;
                message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ["time"] })
                .then((collected) => {
                    var fieldValue = collected.first().content;
                    if (fieldValue.toLowerCase() !== "cancel") {
                        embed.addFields({name: fieldTitle, value: fieldValue});
                        targetMsg.edit("", embed);
                    }
                    else { message.channel.send(failure); }
                }).catch(err => {});
            } else { 
                targetMsg.edit("", embed); 
            }
        } else { message.channel.send(failure); }
    }
};