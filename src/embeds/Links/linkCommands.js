module.exports = async (client, id = []) => {
    const channel = await client.channels.fetch(id);
  
    channel.messages.fetch().then((messages) => {
        const niraMessages = messages.filter(msg => msg.author == client.user);

        if (niraMessages.size === 0) {
            channel.send(links1);
            channel.send(links2);
            channel.send(links3);
        }
        else {
            niraMessages.array()[2].edit(links1);
            niraMessages.array()[1].edit(links2);
            niraMessages.array()[0].edit(links3);
        }
    });
};