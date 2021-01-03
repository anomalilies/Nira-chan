require("dotenv").config();
const configFileName = process.env.NIRA_DEV ? 'config.dev.json' : 'config.json';
const { emojis } = require(`../../${configFileName}`);

module.exports = async (client, id = []) => {
    const channel = await client.channels.fetch(id);
  
    channel.messages.fetch().then((messages) => {
        const niraMessages = messages.filter(msg => msg.author == client.user);

        if (niraMessages.size === 0) {
            channel.send(emojis.spacer);
            channel.send(welcome1);
            channel.send(emojis.spacer);
            channel.send(welcome2);
            channel.send("https://discord.gg/htSDkHH");
            channel.send(emojis.spacer);
        }
        else {
            niraMessages.array()[4].edit(welcome1);
            niraMessages.array()[2].edit(welcome2);
        }
        niraMessages.array()[4].react("756679974953549914");

        client.on("messageReactionAdd", async (reaction, user) => {
            if (reaction.message.id === niraMessages.array()[4].id) {
                if (!user.bot && reaction.emoji.id === "756679974953549914") {
                    await reaction.message.guild.members.cache.get(user.id).roles.add("791126700972441600");
                }
            }
        });
        client.on("messageReactionRemove", async (reaction, user) => {
            if (reaction.message.id === niraMessages.array()[4].id) {
                if (!user.bot && reaction.emoji.id === "756679974953549914") {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove("791126700972441600");
                }
            }
        });
    });
};