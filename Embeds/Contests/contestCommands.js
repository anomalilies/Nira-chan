const { emojis } = require("../../config.json");

module.exports = async (client, id = []) => {
    const channel = await client.channels.fetch(id);
  
    channel.messages.fetch().then((messages) => {
        const niraMessages = messages.filter(msg => msg.author == client.user);

        if (niraMessages.size === 0) {
            channel.send(contest1);
            channel.send(emojis.spacer);
            channel.send(contest2);
            channel.send(emojis.spacer);
            channel.send(contest3);
            channel.send(emojis.spacer);
            channel.send(contest4);
            channel.send(emojis.spacer);
            channel.send(contest5);
            channel.send(emojis.spacer);
        }
        else {
            niraMessages.array()[9].edit(contest1);
            niraMessages.array()[7].edit(contest2);
            niraMessages.array()[5].edit(contest3);
            niraMessages.array()[3].edit(contest4);
            niraMessages.array()[1].edit(contest5);
        }
    });
};