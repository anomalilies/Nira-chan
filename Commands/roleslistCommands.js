/*
const emojis = require("./config.json");
module.exports = async (client, id = []) => {
    const channel = await client.channels.fetch(id)
  
    channel.messages.fetch().then((messages) => {

        if (messages.size === 0) {
            channel.send("**Roles List**")
            channel.send(roles1, `${emojis.spacer}`)
            channel.send(roles2, `${emojis.spacer}`)
            channel.send(roles3, `${emojis.spacer}`)
            channel.send(roles4, `${emojis.spacer}`)
            channel.send("**Role Shop**")
        }
        else channel.messages.fetch("message_id")
        .then(messages => {
            messages.edit(role_embed);
        });
    })
}
*/