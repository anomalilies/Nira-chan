const Commando = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");
const moment = require("moment");

module.exports = class AboutCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: "about",
            aliases: ["serverinfo"],
            group: "misc",
            memberName: "about",
            description: "Find out about the server!",
        })
    }

    async run(message) {
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
        }
		const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
		const members = message.guild.members.cache;
		const channels = message.guild.channels.cache;
		const serverEmojis = message.guild.emojis.cache;

        const serverInfo = new MessageEmbed()
            .setTitle(`About ${message.guild.name}`)
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .setColor(15849719)
			.addField("General", [
                `**❯ Owner:** ${message.guild.owner.user.tag}`,
				`**❯ Region:** ${regions[message.guild.region]}`,
				`**❯ Boost Tier:** ${message.guild.premiumTier ? `Tier ${message.guild.premiumTier}` : "None"}`,
				`**❯ Creation Date:** ${moment(message.guild.createdTimestamp).format("LT")}, ${moment(message.guild.createdTimestamp).format("LL")} (${moment(message.guild.createdTimestamp).fromNow()})`,
				"\u200b"
			])
			.addField("Statistics", [
				`**❯ Role Count:** ${roles.length}`,
				`**❯ Emoji Count:** ${serverEmojis.size} (${serverEmojis.filter(emoji => emoji.animated).size} animated)`,
				`**❯ Member Count:** ${message.guild.memberCount} (${members.filter(member => member.user.bot).size} bots)`,
				`**❯ Text Channels:** ${channels.filter(channel => channel.type === "text").size}`,
				`**❯ Voice Channels:** ${channels.filter(channel => channel.type === "voice").size}`,
				`**❯ Boost Count:** ${message.guild.premiumSubscriptionCount || "0"}`,
				"\u200b"
			], true)
			.addField("Presence", [
				`**❯ Online:** ${members.filter(member => member.presence.status === "online").size}`,
				`**❯ Idle:** ${members.filter(member => member.presence.status === "idle").size}`,
				`**❯ Do Not Disturb:** ${members.filter(member => member.presence.status === "dnd").size}`,
				`**❯ Offline:** ${members.filter(member => member.presence.status === "offline").size}`,
            ], true)
            .setTimestamp()

            if (message.channel.id === "770726574865514517") {
                serverInfo.addField("History", [
                    "**❯ Ex-Owner:** xscore#4740",
                    "**❯ Ex-Administrators:** Dreycan#1936",
                    "**❯ Ex-Moderators:** jiachun#0067, TheSuperCrisb#3502"
                ])
                serverInfo.setFooter("Last updated")

                message.channel.send(serverInfo).then((msg) => {
                    setInterval(function () {
                        msg.edit(serverInfo);
                    }, 60000)
                })
            }
            else {
                message.channel.send(serverInfo)
            }
    }
}