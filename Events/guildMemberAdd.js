const { emojis } = require("../config.json");

module.exports = (client, member) => {
    if (member.guild.id === "603246092402032670") {
        member.guild.channels.cache.get("603246092402032673").send(emojis.wave);

        var newbiesRole = member.guild.roles.cache.find(role => role.name === "Newbies");
        member.roles.add(newbiesRole);
    }
};