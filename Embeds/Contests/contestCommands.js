const configFileName = process.env.NIRA_DEV ? "config.dev.json" : "config.json";
const { emojis } = require(`../../${configFileName}`);
const { MessageEmbed } = require("discord.js");

module.exports = async (client, id = []) => {
    const channel = await client.channels.fetch(id);

    channel.messages.fetch().then((messages) => {
        const niraMessages = messages.filter((msg) => msg.author == client.user);

        const entry = new MessageEmbed()
            .setColor(15849719)
            .setTitle("Contest Entry")
            .setDescription(
                "Register your interest in joining this contest by **reacting with <:nirascoop1:777269746722668565>**!\nFor submitting entries, please **use the form below**!"
            );

        if (niraMessages.size === 0) {
            channel.send(contest1);
            channel.send(emojis.spacer);
            channel.send(contest2);
            channel.send(emojis.spacer);
            channel.send(contest3);
            channel.send(emojis.spacer);
            channel.send(contest4);
            channel.send(emojis.spacer);
            channel.send(contest5);
            channel.send(emojis.spacer);
            channel.send(entry);
            channel.send("https://forms.gle/rLTpuoyrofgz1x6c8");
        } else {
            niraMessages.array()[11].edit(contest1);
            niraMessages.array()[9].edit(contest2);
            niraMessages.array()[7].edit(contest3);
            niraMessages.array()[5].edit(contest4);
            niraMessages.array()[3].edit(contest5);
            niraMessages.array()[1].react("777269746722668565");
        }

        client.on("messageReactionAdd", async (reaction, user) => {
            if (reaction.message.id === niraMessages.array()[1].id) {
                if (!user.bot && reaction.emoji.id === "777269746722668565") {
                    await reaction.message.guild.members.cache.get(user.id).roles.add("770792091353743401");
                }
            }
        });
        client.on("messageReactionRemove", async (reaction, user) => {
            if (reaction.message.id === niraMessages.array()[1].id) {
                if (!user.bot && reaction.emoji.id === "777269746722668565") {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove("770792091353743401");
                }
            }
        });
    });
};
