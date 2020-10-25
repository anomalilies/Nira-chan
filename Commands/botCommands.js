/*
module.exports = async (client, id2 = []) => {
    const channel = await client.channels.fetch(id2)
  
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
            channel.send("<:spacer:757807111756447806>")
            channel.send("Don't have Nitro, but want to still use our animated emojis (and other Easter eggs from other servers)? Use the commands below!\nPlease note that although we'll try to update this list as often as possible, we can't promise that all commands will be listed.\nFor a full, up-to-date log, simply use `-command list`!")
        }
        else channel.messages.fetch("message_id")
            .then(messages => {
                messages.edit(embed_id);
        });
    })
}
*/