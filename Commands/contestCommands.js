/*
const emojis = require("./config.json");
module.exports = async (client, id = []) => {
    const channel = await client.channels.fetch(id)
  
    channel.messages.fetch().then((messages) => {

        if (messages.size === 0) {
            channel.send(contest1, `${emojis.spacer}`)
            channel.send(contest2, `${emojis.spacer}`)
            channel.send(contest3, `${emojis.spacer}`)
            channel.send(contest4, `${emojis.spacer}`)
            channel.send(contest5, `${emojis.spacer}`)
        }
        else channel.messages.fetch("message_id")
        .then(messages => {
            messages.edit(role_embed);
        });
    })
}
*/