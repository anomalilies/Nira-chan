module.exports = (client, member) => {
    const channel = client.channels.cache.get("742513756059467917");

    if (member.guild.id === "603246092402032670") {
        channel.send("**" + member.user.username + `** joined! <:nirahello:777736555829002281>`);
    }
    client.on("guildMemberRemove", member => {
        channel.send(`**` + member.user.username + `**, left... <:nirawail:777736598854696980>`);
    })
};