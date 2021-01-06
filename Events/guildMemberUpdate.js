const configFileName = process.env.NIRA_DEV ? 'config.dev.json' : 'config.json';
const { emojis } = require(`../${configFileName}`);

var contributorRoles = [
    "Journalists", "Contestants", "Hackers", "Stans", "Editors",
    "Translators", "Meme Royalty", "Theorists", "Musicians", "Artists"
];

module.exports = async (client, oldMember, newMember) => {
    const channel = client.channels.cache.get("603246092402032673");
    const isRegular = "751209585464836137";
    const isIntVIP = "776872223427788821";

    const isContributor = "761383555372023860";
    const inContributorGroup = r=>contributorRoles.includes(r.name);

    if (oldMember.roles.cache.size !== newMember.roles.cache.size) {
        // Server Boost Message
        if (!oldMember.roles.cache.has("744738039116464151") && newMember.roles.cache.has("744738039116464151")) {
            channel.send(emojis.yay);
            newMember.roles.add("796211149397819442");
            newMember.roles.add("781295857706336296");
            newMember.roles.add("770022309393334302");
            newMember.roles.add("765347466169024512");
        }
        // Lock Regulars for Non-Newbies
        if (oldMember.roles.cache.has("774482130737561600") && newMember.roles.cache.has(isRegular)) {
            newMember.roles.remove(isRegular);
        }
        // International V.I.P. Check
        if (oldMember.roles.cache.has(isIntVIP) && newMember.roles.cache.has("742822553218711562")) {
            newMember.roles.remove(isIntVIP);
        }
        // Contributors Role
        if (!oldMember.roles.cache.has(isContributor) && newMember.roles.cache.some(inContributorGroup)) {
            newMember.roles.add(isContributor);
        }
        else if (oldMember.roles.cache.has(isContributor) && !newMember.roles.cache.some(inContributorGroup)) {
            newMember.roles.remove(isContributor);
        }
    }
};