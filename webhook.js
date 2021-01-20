/*async function getMessageEmotes(message) {
    // return early if author is bot
    if (message.author.bot) return message.content.slice(1);
    
    // return early if length of split message contents is less than 3, since a pair of backticks makes it length >= 3
    let content = message.content.toLowerCase().slice(1).split(/\`/);
    if (content.length < 3) return message.content.slice(1);

    // get the emotes from each guild
    let emoteCache = [];
    let guilds = await message.client.guilds.cache;
    guilds.forEach(guild => {
        emoteCache.push(guild.emojis.cache)
    });

    // try to match the emote name to every emote in each guild
    const alphanum = /^[a-z0-9\_]+$/i;

    content = await Promise.all(content.map(async substring => {
        // return backticks for the empty substrings
        if (substring === '') return '\`';

        // return substring if not alphanumeric
        if (substring.match(alphanum) === null) return substring;

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

async function replaceMessageEmotes(message, content) {
    message.delete();
    console.log(content);

    const webhooks = await message.channel.fetchWebhooks();
    const webhook = webhooks.first();
    console.log(webhooks)

    let member = message.guild.member(message.author);
    let nickname = member ? member.displayName : null;
    let avatar = message.author.displayAvatarURL();

    if (typeof(webhook) === 'undefined') {                
        // no webhook exists in this channel, so create one
        message.channel.createWebhook('CinnaBot')
            .then(webhook => {
                webhook.send(content, {
                    username: nickname,
                    avatarURL: avatar,
                });
            });
    } else {
        // send the content through the existing channel webhook
        webhook.send(content, {
            username: nickname,
            avatarURL: avatar,
        });
    }
}

module.exports = {
    getMessageEmotes,
    replaceMessageEmotes,
};*/