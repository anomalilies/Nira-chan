///*
module.exports = async (client, id = []) => {
    const channel = await client.channels.fetch(id)
  
    channel.messages.fetch().then((messages) => {

        if (messages.size === 0) {
            channel.send("**Please keep bot commands strictly to channels in the Bots category only** - Thank you!")
            channel.send("<:spacer:757807111756447806>")
            channel.send("**`!` Prefix**\nThe following commands use `!` as a prefix.")
            channel.send(bc1)
            channel.send("<:spacer:757807111756447806>")
            channel.send(bc2)
            channel.send("<:spacer:757807111756447806>")
            channel.send(bc3)
            channel.send("<:spacer:757807111756447806>")
            channel.send("**`-` Prefix**\nThe following commands use `-` as a prefix.")
            channel.send(bc4)
            channel.send("<:spacer:757807111756447806>")
            channel.send(bc5)
            channel.send(bc6)
            channel.send("<:spacer:757807111756447806>")
            channel.send(bc7)
            channel.send("<:spacer:757807111756447806>")
            channel.send(bc8)
            channel.send("<:spacer:757807111756447806>")
            channel.send(bc9)
            channel.send("<:spacer:757807111756447806>")
            channel.send("**Miscellaneous**")
            channel.send(bc10)
        }
        else channel.messages.fetch("769354284600786955")
            .then(messages => {
                messages.edit(bc9);
        });
    })
}
//*/