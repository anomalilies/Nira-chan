const configFileName = process.env.NIRA_DEV ? 'config.dev.json' : 'config.json';
const { homeguild } = require(`../${configFileName}`);

module.exports = (client, member) => {
    const channel = client.channels.cache.get("742513756059467917");

    if (member.guild.id === homeguild) {
        channel.send("**" + member.user.username + "** joined! <:nirahello:777736555829002281>");
    }
};