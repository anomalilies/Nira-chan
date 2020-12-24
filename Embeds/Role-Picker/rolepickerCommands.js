module.exports = async (client, id = []) => {
    const channel = await client.channels.fetch(id);
  
    channel.messages.fetch().then((messages) => {
        const niraMessages = messages.filter(msg => msg.author == client.user);

        if (niraMessages.size === 0) {
            channel.send(pronouns)
            .then(react("777736598854696980")).then(react("777736555829002281"))
            channel.send("<:spacer:757807111756447806>");
            channel.send(miscellaneous);
            channel.send("<:spacer:757807111756447806>");
            channel.send(dividers);
            channel.send("<:spacer:757807111756447806>");
            channel.send(colours);
        }
    });
};