const { allowlists, emojis } = require("../config.json");

// Find specific emojis in a message
function matchEmojis(find_emojis, message_content) {
    const emoji_regexp = /<a?:\w+:\d+>/g;
    const matches = [...message_content.matchAll(emoji_regexp)];
    let matched_emojis = [];
    matches.forEach(match => {
        if (find_emojis.includes(match[0])) {
            matched_emojis.push(match[0]);
            if (match[0] === emojis.owie) {
                matched_emojis.push(emojis.cursed);
            }
        }
    });
    return matched_emojis;
}

module.exports = async (client, oldMessage, newMessage) => {

    // Check Edited Messages
    async function userReactions(newMessage) {
        {
            const userReactions = (newMessage.reactions.cache.filter(reaction => reaction.users.cache.has(client.user.id)));
            for (const reaction of userReactions.values()) {
                await reaction.users.remove(client.user.id);
            }
        }
    }
    await userReactions(newMessage);

    // Check for NiraMojis in their channels
    if (allowlists.disgustchannels.includes(newMessage.channel.id)) {
        if (![emojis.disgust].includes(newMessage.content)) {
            return newMessage.delete();
        }
    } else if (allowlists.starechannels.includes(newMessage.channel.id)) {
        if (![emojis.stare].includes(newMessage.content)) {
            return newMessage.delete();
        }
    } else if (allowlists.owiechannels.includes(newMessage.channel.id)) {
        if (![emojis.owie].includes(newMessage.content)) {
            return newMessage.delete();
        }
    }
    
    // Check for NiraMojis everywhere
    if (newMessage.content.includes(emojis.disgust) || newMessage.content.includes(emojis.stare) || newMessage.content.includes(emojis.owie)) {
        const find_emojis = [emojis.disgust, emojis.stare, emojis.owie];
        let matched_emojis = matchEmojis(find_emojis, newMessage.content);

        matched_emojis.forEach(e => newMessage.react(e));
    }

    // PatPat Role
    // The member attribute is undefined on some messages so check if it's defined first
    if (newMessage.member && newMessage.member.roles.cache.get("765347466169024512")) {
        if (newMessage.content.toLowerCase().includes("patpat", emojis.patpat)) {
            newMessage.react("761487227921367051");
        }
    }

    // Nira Wave
    if (newMessage.mentions.users.has(client.user.id)) {
        newMessage.react("742394597174673458");
    }
};