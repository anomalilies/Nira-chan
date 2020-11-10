module.exports = async (client, id, serverInfo = []) => {
    const channel = await client.channels.fetch(id);
  
    channel.messages.fetch().then((messages) => {
        const niraMessages = messages.filter(msg => msg.author == client.user);

        if (niraMessages.size === 0) {
            channel.send(archive);
            channel.send("https://discord.gg/tBerq3wjtW");
            channel.send("<:spacer:757807111756447806>");
            channel.send(lore);
            channel.send("<:spacer:757807111756447806>");
            channel.send(serverInfo)
        }
        else {
            niraMessages.array()[0].edit(archive);
            setInterval(function () {
                niraMessages.array()[5].edit(serverInfo);
            }, 5000)
            console.log("test")
        }
    });
};

//i need to import the command for serverinfo not to return blank?