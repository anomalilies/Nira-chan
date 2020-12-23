const path = require("path");
const serverInfoEmbed = require("../Embeds/serverInfoEmbed");

const aboutEmbeds = require("../Embeds/About/aboutEmbeds");
const archiveEmbeds = require("../Embeds/Archive/archiveEmbeds");
const botEmbeds = require("../Embeds/Bots/botEmbeds");
const contestEmbeds = require("../Embeds/Contests/contestEmbeds");
const linkEmbeds = require ("../Embeds/Links/linkEmbeds");
const roleslistEmbeds = require("../Embeds/Roles/roleslistEmbeds");
const welcomeEmbeds = require("../Embeds/Welcome/welcomeEmbeds");

const aboutCommands = require("../Embeds/About/aboutCommands");
const archiveCommands = require("../Embeds/Archive/archiveCommands");
const botCommands = require("../Embeds/Bots/botCommands");
const contestCommands = require("../Embeds/Contests/contestCommands");
const linkCommands = require ("../Embeds/Links/linkCommands");
const roleslistCommands = require("../Embeds/Roles/roleslistCommands");
const welcomeCommands = require("../Embeds/Welcome/welcomeCommands");


var statuses = ["you in disgust.", "(staring at) you.", "you in pain— owie!", "over the fishy league!", "you~wu~(♥ω♥*)!", "you, forever & always.", ";´༎ຶਊ ༎ຶ`;"]

module.exports = async (client) => {
    console.log(`${client.user.tag} activated!`);
    function statusChange() {
        client.user.setActivity(statuses[Math.floor(Math.random() * statuses.length)], { type: "WATCHING" });
    }
    setInterval(statusChange, 60000);

    client.registry
    .registerGroups([
        ["fun", "Fun"],
        ["misc", "Miscellaneous"],
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
        var lurkersRole = list.roles.cache.find(role => role.name === "Lurkers");
    
        list.members.cache.each(member => {
            if (!member.roles.cache.get(lurkersRole.id)) {
                if (Date.now() - member.joinedTimestamp > 86400000) {
                    member.roles.add(lurkersRole);
                }
                else return;
            }
        });
    }

    if (client.user.id === "740606402330099752") {
        setInterval(checkLurkers, 3600000);

        const channel = client.channels.cache.get("770726574865514517");
        channel.messages.fetch({around: "776320801729019934", limit: 1})
            .then(msg => {
                const fetchedMsg = msg.first();
                setInterval(function () {
                fetchedMsg.edit(serverInfoEmbed(fetchedMsg.guild));
            }, 300000);
        });

        aboutCommands(client, "760625396487684126");
        archiveCommands(client, "770726574865514517");
        botCommands(client, "742548177462231120");
        contestCommands(client, "770795084002230292");
        linkCommands(client, "742069780328087613");
        roleslistCommands(client, "758494476174884905");
        welcomeCommands(client, "603248229928140801");
    }
};