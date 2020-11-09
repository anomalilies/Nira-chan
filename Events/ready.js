const path = require("path");
var data = require("../Commands/Fun/UWU Translator/data");

const archiveEmbeds = require("../Embeds/Archive/archiveEmbeds");
const botEmbeds = require("../Embeds/Bots/botEmbeds");
const contestEmbeds = require("../Embeds/Contests/contestEmbeds");
const roleslistEmbeds = require("../Embeds/Roles/roleslistEmbeds");

const archiveCommands = require("../Embeds/Archive/archiveCommands");
const botCommands = require("../Embeds/Bots/botCommands");
const contestCommands = require("../Embeds/Contests/contestCommands");
const roleslistCommands = require("../Embeds/Roles/roleslistCommands");

module.exports = async (client, member) => {
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

    function checkNewbies() {
        if (member.guild.id === "706628883440468060") {
            var newbiesRole = member.guild.roles.cache.find(role => role.name === "Newbies");
    
            if (newbiesRole) {
                if (Date.now() == member.joinedAt < 30000) {
                    member.roles.remove(newbiesRole);
                    console.log ("role removed")
                }
            else return;
            }
        }
    };
    function checkLurkers() {
        if (member.guild.id === "706628883440468060") {
            var lurkersRole = member.guild.roles.cache.find(role => role.name === "Lurkers");
    
            if (lurkersRole) {
                if (Date.now() === member.joinedAt > 604800000) {
                    member.roles.add(lurkersRole);
                }
                else return;
            }
        }
    };
    setInterval(checkLurkers, 3600000);
    setInterval(checkNewbies, 30000);

    /*archiveCommands(client, "770726574865514517");
    botCommands(client, "742548177462231120");
    contestCommands(client, "770795084002230292");
    roleslistCommands(client, "758494476174884905");*/
};