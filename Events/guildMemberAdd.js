const configFileName = process.env.NIRA_DEV ? 'config.dev.json' : 'config.json';
const { homeguild, members } = require(`../${configFileName}`);

module.exports = (client, member) => {
    const modlog = client.channels.cache.get("742513756059467917");
    const channel = client.channels.cache.get("603246092402032673");

    if (member.guild.id === homeguild) {
        modlog.send(`**${member.user.username}** joined! <:niraHello:777736555829002281>`);
        channel.send(`<@${members.currentowner}> tells me that **${member.user.username}** will join shortly... 🪄`)
    }
};