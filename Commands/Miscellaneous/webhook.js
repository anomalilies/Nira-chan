async function replaceMessageEmotes(message, resend_content) {
    if (message.channel.id !== "758541031498317835") {
        if (message.channel.type !== "dm") {
            message.delete();
        }
        const webhooks = await message.channel.fetchWebhooks();
        const webhook = webhooks.filter(w => w.owner.id === message.client.user.id);

        let member = message.guild.member(message.author);
        let nickname = member ? member.displayName : null;
        let avatar = message.author.displayAvatarURL();
            
        if (webhook === undefined) {
            // No webhook exists in this channel, so create one
            message.channel.createWebhook("Nira-chan")
            .then(webhook => {
                // Resend the message with the OP's avatar and display name
                webhook.send(resend_content, {
                    username: nickname,
                    avatarURL: avatar
                });
            }) .catch(console.error);
        } else {
            // Resend the message with the OP's avatar and display name
            webhook.send(resend_content, {
                username: nickname,
                avatarURL: avatar
            });
        }
    }
}

async function getMessageEmotes(message) {
    console.log(message)
    // get the emotes from each guild
    let emoteCache = [];
    let guilds = await message.client.guilds.cache;
    guilds.forEach(guild => {
        emoteCache.push(guild.emojis.cache)
    });

    content = await Promise.all(content.map(async substring => {
        let emotePicker = [];
        for (let emotes of emoteCache) {
            emotes.forEach(emote => {
                if (substring === emote.name.toLowerCase()) emotePicker.push(emote);
            });
        }

        // return the original substring if no matches were found
        if (emotePicker.length === 0) return substring;
        
        // if multiple matches are found, prioritize using the emote in the messaged server
        // otherwise, default to the first emote
        if (emotePicker.length >= 1) {
            needs_resend = emoji.animated || needs_resend;

            let emote = [];
            if (emotePicker.some(emote => emote.guild.id === message.guild.id)) {
                let emotes = emotePicker.filter(emote => emote.guild.id === message.guild.id);
                emote = emotes[0];
            } else {
                emote = emotePicker[0];
            }     
            return (emote.animated) ? `<a:${emote.name}:${emote.id}>` : `<:${emote.name}:${emote.id}>`
        };
    })).then((results) => {
        return results.join('');
    })
    return content;
}

module.exports = {
    getMessageEmotes,
    replaceMessageEmotes
};