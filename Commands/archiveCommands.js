module.exports = async (client, id = []) => {
    const channel = await client.channels.fetch(id)
  
    channel.messages.fetch().then((messages) => {
        const niraMessages = messages.filter(msg => msg.author == client.user);

        if (niraMessages.size === 0) {
            channel.send("<:spacer:757807111756447806>")
            channel.send(archive)
            channel.send("https://discord.gg/tBerq3wjtW")
            channel.send("<:spacer:757807111756447806>")
            channel.send(lore)
            channel.send("<:spacer:757807111756447806>")
        }
        else {
            niraMessages.array()[4].edit(archive);
        }
    })
}