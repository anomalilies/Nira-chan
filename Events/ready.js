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

module.exports = (client) => {
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

    /*archiveCommands(client, "770726574865514517");
    botCommands(client, "742548177462231120");
    contestCommands(client, "770795084002230292");
    roleslistCommands(client, "758494476174884905");*/
};