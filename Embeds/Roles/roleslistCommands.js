const configFileName = process.env.NIRA_DEV ? "config.dev.json" : "config.json";
const { emojis } = require(`../../${configFileName}`);

module.exports = async (client, id = []) => {
    const channel = await client.channels.fetch(id);

    channel.messages.fetch().then((messages) => {
        const niraMessages = messages.filter((msg) => msg.author == client.user);

        if (niraMessages.size === 0) {
            channel.send("**Roles List**");
            channel.send(roles1);
            channel.send(emojis.spacer);
            channel.send(roles2);
            channel.send(emojis.spacer);
            channel.send(roles3);
            channel.send(emojis.spacer);
            channel.send(roles4);
            channel.send(emojis.spacer);
            channel.send("**Role Shop**");
        } else {
            niraMessages.array()[8].edit(roles1);
            niraMessages.array()[6].edit(roles2);
            niraMessages.array()[4].edit(roles3);
            niraMessages.array()[2].edit(roles4);
        }
    });
};
