const { emojis } = require("../config.json");

var contributorRoles = [
    "Journalists", "Contestants", "Hackers", "Stans", "Editors",
    "Translators", "Meme Royalty", "Theorists", "Musicians", "Artists"
];

module.exports = async (client, oldMember, newMember) => {
    const isContributor = "761383555372023860";
    const inContributorGroup = r=>contributorRoles.includes(r.name);
    const channel = client.channels.cache.get("603246092402032673");

    if (oldMember.roles.cache.size !== newMember.roles.cache.size) {
        if (!oldMember.roles.cache.has("744738039116464151") && newMember.roles.cache.has("744738039116464151")) {
            channel.send(emojis.yay);
        }
        // Contributors Role
        else if (!oldMember.roles.cache.has(isContributor) && newMember.roles.cache.some(inContributorGroup)) {
            newMember.roles.add(isContributor);
        }
        else if (oldMember.roles.cache.has(isContributor) && !newMember.roles.cache.some(inContributorGroup)) {
            newMember.roles.remove(isContributor);
        }
    }
};