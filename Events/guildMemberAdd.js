const { emojis } = require("../config.json");

module.exports = (client, member) => {
    if (member.guild.id === "603246092402032670") {
        const channel = client.channels.cache.get("742513756059467917");
        channel.send("**" + member.user.username + `** joined! ${emojis.yay}`);
    }
};