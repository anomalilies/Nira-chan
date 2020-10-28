/*
module.exports = async (client, id = []) => {
    const channel = await client.channels.fetch(id)
  
    channel.messages.fetch().then((messages) => {

        if (messages.size === 0) {
            channel.send(contest1)
            channel.send("<:spacer:757807111756447806>")
            channel.send(contest2)
            channel.send("<:spacer:757807111756447806>")
            channel.send(contest3)
            channel.send("<:spacer:757807111756447806>")
            channel.send(contest4)
            channel.send("<:spacer:757807111756447806>")
            channel.send(contest5)
            channel.send(contest6)
            channel.send("<:spacer:757807111756447806>")
        }
        else channel.messages.fetch("message_id")
        .then(messages => {
            messages.edit(role_embed);
        });
    })
}
*/