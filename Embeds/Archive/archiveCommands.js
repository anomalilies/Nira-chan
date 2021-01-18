const configFileName = process.env.NIRA_DEV ? "config.dev.json" : "config.json";
const { emojis } = require(`../../${configFileName}`);

module.exports = async (client, id = []) => {
    const channel = await client.channels.fetch(id);

    channel.messages.fetch().then((messages) => {
        const niraMessages = messages.filter((msg) => msg.author == client.user);

        if (niraMessages.size === 0) {
            channel.send(archive);
            channel.send("https://discord.gg/tBerq3wjtW");
            channel.send(emojis.spacer);
            channel.send(nitro);
            channel.send(emojis.spacer);
            channel.send(emojis.spacer);
        } else {
            niraMessages.array()[5].edit(archive);
            niraMessages.array()[2].edit(nitro);
        }
    });
};
