///*
module.exports = async (client, id = []) => {
    const channel = await client.channels.fetch(id)
  
    channel.messages.fetch().then((messages) => {

        if (messages.size === 0) {
            channel.send("**Roles List**")
            channel.send(roles1)
            channel.send("<:spacer:757807111756447806>")
            channel.send(roles2)
            channel.send("<:spacer:757807111756447806>")
            channel.send(roles3)
            channel.send("<:spacer:757807111756447806>")
            channel.send(roles4)
            channel.send("<:spacer:757807111756447806>")
            channel.send("**Role Shop**")
        }
        else channel.messages.fetch("770326902123528192")
        .then(messages => {
            messages.edit(roles2);
        });
    })
}
//*/