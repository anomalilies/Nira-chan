const path = require("path");
var data = require("../Commands/Fun/UWU Translator/data");
const serverInfoEmbed = require("../Embeds/serverInfoEmbed");

const aboutEmbeds = require("../Embeds/About/aboutEmbeds");
const archiveEmbeds = require("../Embeds/Archive/archiveEmbeds");
const botEmbeds = require("../Embeds/Bots/botEmbeds");
const contestEmbeds = require("../Embeds/Contests/contestEmbeds");
const linkEmbeds = require ("../Embeds/Links/linkEmbeds");
const roleslistEmbeds = require("../Embeds/Roles/roleslistEmbeds");

const aboutCommands = require("../Embeds/About/aboutCommands");
const archiveCommands = require("../Embeds/Archive/archiveCommands");
const botCommands = require("../Embeds/Bots/botCommands");
const contestCommands = require("../Embeds/Contests/contestCommands");
const linkCommands = require ("../Embeds/Links/linkCommands");
const roleslistCommands = require("../Embeds/Roles/roleslistCommands");

module.exports = async (client) => {
    console.log(`${client.user.tag} activated!`);
    function statusChange() {
        client.user.setActivity(data.statuses[Math.floor(Math.random() * data.statuses.length)], { type: "WATCHING" });
    }
    setInterval(statusChange, 60000);

    client.registry
    .registerGroups([
        ["fun", "Fun Commands"],
        ["misc", "Miscellaneous Commands"],
        ["util", "Utility"],
        ["commands", "Commands"]
    ])
    .registerDefaultTypes()
    .registerDefaultCommands({
        unknownCommand: false
    })
    .registerCommandsIn(path.join(__dirname, "../Commands"));

    function checkLurkers() {
        const list = client.guilds.cache.get("757726578309595238");
        var lurkersRole = member.guild.roles.cache.find(role => role.name === "Lurkers");
    
        list.members.cache.each(member => {
            if (!member.roles.cache.get(lurkersRole.id)) {
                if (Date.now() - member.joinedTimestamp > 86400000) {
                    member.roles.add(lurkersRole);
                }
                else return;
            }
        });
    }
    function checkNewbies() {
        const guild = client.guilds.cache.get("603246092402032670");
        var newbiesRole = guild.roles.cache.find(role => role.name === "Newbies");

        newbiesRole.members.forEach(member => {
            if (Date.now() - member.joinedTimestamp > 604800000) {
                member.roles.remove(newbiesRole);
            }
        });
    }
    setInterval(checkLurkers, 3600000);
    setInterval(checkNewbies, 3600000);

    const channel = client.channels.cache.get("770726574865514517");
    channel.messages.fetch({around: "776320801729019934", limit: 1})
    .then(msg => {
        const fetchedMsg = msg.first();
        setInterval(function () {
            fetchedMsg.edit(serverInfoEmbed(fetchedMsg.guild));
        }, 300000)
    });


    const rulesChannel = client.channels.cache.get("603248229928140801");
    rulesChannel.messages.fetch({around: "768553497946750996", limit: 1})
    .then(msg => {
        const fetchedMsg = msg.first();
        fetchedMsg.edit(rule1);
    });


    aboutCommands(client, "760625396487684126");
    archiveCommands(client, "770726574865514517");
    botCommands(client, "742548177462231120");
    contestCommands(client, "770795084002230292");
    linkCommands(client, "742069780328087613");
    roleslistCommands(client, "758494476174884905");
};