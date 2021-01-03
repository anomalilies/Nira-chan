const { homeguild } = require("../config.json");

module.exports = (client, member) => {
    const channel = client.channels.cache.get("742513756059467917");

    if (member.guild.id === homeguild) {
        channel.send("**" + member.user.username + "** left... <:nirawail:777736598854696980>");
    }
};