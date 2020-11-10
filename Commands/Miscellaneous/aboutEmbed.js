const { MessageEmbed } = require("discord.js");
const moment = require("moment");

var aboutEmbed = {
    function(message) {
        const regions = {
            brazil: "Brazil",
            europe: "Europe",
            hongkong: "Hong Kong",
            india: "India",
            japan: "Japan",
            russia: "Russia",
            singapore: "Singapore",
            southafrica: "South Africa",
            sydney: "Sydney",
            "us-central": "US Central",
            "us-east": "US East",
            "us-west": "US West",
            "us-south": "US South"
        };
		const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
		const members = message.guild.members.cache;
		const channels = message.guild.channels.cache;
		const serverEmojis = message.guild.emojis.cache;

        serverInfo = new MessageEmbed()
            .setTitle(`About ${message.guild.name}`)
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .setColor(15849719)
			.addField("General", [
                `**â¯ Owner:** ${message.guild.owner.user.tag}`,
				`**â¯ Region:** ${regions[message.guild.region]}`,
				`**â¯ Boost Tier:** ${message.guild.premiumTier ? `Tier ${message.guild.premiumTier}` : "None"}`,
				`**â¯ Creation Date:** ${moment(message.guild.createdTimestamp).format("LT")}, ${moment(message.guild.createdTimestamp).format("LL")} (${moment(message.guild.createdTimestamp).fromNow()})`,
				"\u200b"
			])
			.addField("Statistics", [
				`**â¯ Role Count:** ${roles.length}`,
				`**â¯ Emoji Count:** ${serverEmojis.size} (${serverEmojis.filter(emoji => emoji.animated).size} animated)`,
				`**â¯ Member Count:** ${message.guild.memberCount} (${members.filter(member => member.user.bot).size} bots)`,
				`**â¯ Text Channels:** ${channels.filter(channel => channel.type === "text").size}`,
				`**â¯ Voice Channels:** ${channels.filter(channel => channel.type === "voice").size}`,
				`**â¯ Boost Count:** ${message.guild.premiumSubscriptionCount || "0"}`,
				"\u200b"
			], true)
			.addField("Presence", [
				`**â¯ Online:** ${members.filter(member => member.presence.status === "online").size}`,
				`**â¯ Idle:** ${members.filter(member => member.presence.status === "idle").size}`,
				`**â¯ Do Not Disturb:** ${members.filter(member => member.presence.status === "dnd").size}`,
				`**â¯ Offline:** ${members.filter(member => member.presence.status === "offline").size}`,
            ], true)
            .setFooter("Last updated")
            .setTimestamp();
    
        require("../Commands/Miscellaneous/aboutEmbed").run(message);
        return(serverInfo);
    }
};

module.exports = aboutEmbed;