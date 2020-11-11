module.exports = async (client, id = []) => {
    const channel = await client.channels.fetch(id);
  
    channel.messages.fetch().then((messages) => {
        const niraMessages = messages.filter(msg => msg.author == client.user);

        if (niraMessages.size === 0) {
            channel.send(links1);
            channel.send(links2);
            channel.send(links3);
            channel.send("<:spacer:757807111756447806>");
            channel.send("**Miscellaneous**");
        }
        /*else {
            const channel = client.channels.cache.get("776129558025076806");
            channel.messages.fetch({around: "776141603634282567", limit: 1})
            .then(msg => {
                const links1Msg = msg.first();
                setInterval(function () {
                    links1Msg.edit(links1);
                })
            });
            channel.messages.fetch({around: "776141603634282567", limit: 1})
            .then(msg => {
                const links2Msg = msg.first();
                setInterval(function () {
                    links2Msg.edit(links2);
                })
            });
            channel.messages.fetch({around: "776141603634282567", limit: 1})
            .then(msg => {
                const links3Msg = msg.first();
                setInterval(function () {
                    links3Msg.edit(links3);
                })
            });
        }*/
    });
};