const configFileName = process.env.NIRA_DEV ? 'config.dev.json' : 'config.json';
const { homeguild } = require(`../${configFileName}`);

module.exports = (client, member) => {
    const modlog = client.channels.cache.get("742513756059467917");

    if (member.guild.id === homeguild) {
        modlog.send(`**${member.user.username}** left... <:niraWail:777736598854696980>`);
    }
};