module.exports = async (client, id = []) => {
    const channel = await client.channels.fetch(id);

    channel.messages.fetch().then((messages) => {
        const niraMessages = messages.filter((msg) => msg.author == client.user);

        if (niraMessages.size === 0) {
            channel.send("**About**");
            channel.send(about1);
            channel.send(emojis.spacer);
            channel.send(about2);
            channel.send(emojis.spacer);
            channel.send(about3);
            channel.send(emojis.spacer);
            channel.send("**Discography**");
            channel.send(cd1);
            channel.send(emojis.spacer);
            channel.send(cd2);
            channel.send(emojis.spacer);
            channel.send(cd3);
            channel.send(emojis.spacer);
            channel.send(cd4);
            channel.send(emojis.spacer);
            channel.send(cd5);
            channel.send(emojis.spacer);
        } else {
            niraMessages.array()[16].edit(about1);
            niraMessages.array()[14].edit(about2);
            niraMessages.array()[12].edit(about3);
            niraMessages.array()[9].edit(cd1);
            niraMessages.array()[7].edit(cd2);
            niraMessages.array()[5].edit(cd3);
            niraMessages.array()[3].edit(cd4);
            niraMessages.array()[1].edit(cd5);
        }
    });
};
