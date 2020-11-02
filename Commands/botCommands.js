/*
const emojis = require("./config.json");
module.exports = async (client, id = []) => {
    const channel = await client.channels.fetch(id)
  
    channel.messages.fetch().then((messages) => {

        if (messages.size === 0) {
            channel.send("**Please keep bot commands strictly to channels in the Bots category only** - Thank you!")
            channel.send("<:spacer:757807111756447806>")
            channel.send("**`!` Prefix**\nThe following commands use `!` as a prefix.")
            channel.send(bc1, `${emojis.spacer}`)
            channel.send(bc2, `${emojis.spacer}`)
            channel.send(bc3, `${emojis.spacer}`)
            channel.send("**`-` Prefix**\nThe following commands use `-` as a prefix.")
            channel.send(bc4, `${emojis.spacer}`)
            channel.send(bc5, `${emojis.spacer}`)
            channel.send(bc6, `${emojis.spacer}`)
            channel.send(bc7, `${emojis.spacer}`)
            channel.send(bc8, `${emojis.spacer}`)
            channel.send(bc9, `${emojis.spacer}`)
            channel.send("`Miscellaneous` Prefixes")
            channel.send(bc10)
        }
        else channel.messages.fetch("message_id")
            .then(messages => {
                messages.edit(embed_id);
        });
    })
}
*/