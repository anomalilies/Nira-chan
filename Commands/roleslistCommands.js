///*
module.exports = async (client, id = []) => {
    const channel = await client.channels.fetch(id)
  
    channel.messages.fetch().then((messages) => {

        if (messages.size === 2) {
            channel.send("<:spacer:757807111756447806>")
            channel.send("**Other Roles**")
            channel.send(roles1)
            channel.send("<:spacer:757807111756447806>")
            channel.send(roles2)
            channel.send("<:spacer:757807111756447806>")
            channel.send(roles3)
            channel.send("<:spacer:757807111756447806>")
            channel.send(roles4)
        }
        else channel.messages.fetch("769008744629141525")
        .then(messages => {
            messages.edit(roles4);
    });
    })
}
//*/