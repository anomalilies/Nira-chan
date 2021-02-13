// const configFileName = process.env.NIRA_DEV ? 'config.dev.json' : 'config.json';
// const { emojis } = require(`../${configFileName}`);

// var contributorRoles = [
//     "Journalists", "Contestants", "Hackers", "Stans", "Editors",
//     "Translators", "Meme Royalty", "Theorists", "Musicians", "Artists"
// ];

// module.exports = async (client, oldMember, newMember) => {
//     const channel = client.channels.cache.get("603246092402032673");
//     const regularRole = "751209585464836137";
//     const contributorRole = "761383555372023860";
//     const muteRole = "745439119479406693";
//     const newbiesRole = "774482130737561600";
//     const VIPRole = "790791220179632128";
//     const inContributorGroup = r=>contributorRoles.includes(r.name);

//     if (oldMember.roles.cache.size !== newMember.roles.cache.size) {
//         // Server Boost Message
//         if (!oldMember.roles.cache.has("744738039116464151") && newMember.roles.cache.has("744738039116464151")) {
//             channel.send(emojis.yay);
//             newMember.roles.add("796211149397819442");
//             newMember.roles.add("781295857706336296");
//             newMember.roles.add("770022309393334302");
//             newMember.roles.add("765347466169024512");
//         }
//         // Lock Regulars for Non-Newbies
//         if (oldMember.roles.cache.has(newbiesRole) && newMember.roles.cache.has(regularRole)) {
//             newMember.roles.remove(regularRole);
//         }
//         // Contributors Role
//         if (!oldMember.roles.cache.has(contributorRole) && newMember.roles.cache.some(inContributorGroup)) {
//             newMember.roles.add(contributorRole);
//         }
//         else if (oldMember.roles.cache.has(contributorRole) && !newMember.roles.cache.some(inContributorGroup)) {
//             newMember.roles.remove(contributorRole);
//         }
//         // Mute Role
//         if (newMember.roles.cache.has(muteRole)) {
//             if (newMember.roles.cache.has(newbiesRole)) {
//                 newMember.roles.remove(newbiesRole);
//             } else {
//                 newMember.roles.remove(VIPRole);
//             }
//         }
//         else if (oldMember.roles.cache.has(muteRole) && !newMember.roles.cache.has(muteRole)) {
//             if (Date.now() - newMember.joinedTimestamp < 259200000) {
//                 newMember.roles.add(newbiesRole);
//             } else {
//                 newMember.roles.add(VIPRole);
//             }
//         }
//     }
// };

export default function () {
  console.log('hi');
}
