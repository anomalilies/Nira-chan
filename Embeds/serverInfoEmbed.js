const { MessageEmbed } = require("discord.js");
const moment = require("moment");

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

module.exports = (guild) => {
    const roles = guild.roles.cache.sort((a, b) => b.position - a.position).map((role) => role.toString());
    const members = guild.members.cache;
    const channels = guild.channels.cache;
    const serverEmojis = guild.emojis.cache;

    let serverInfo = new MessageEmbed()
        .setTitle(`About ${guild.name}`)
        .setThumbnail(guild.iconURL({ dynamic: true }))
        .setColor(15849719)
        .addField("General", [
            `**❯ Owner:** ${guild.owner.user.tag}`,
            `**❯ Region:** ${regions[guild.region]}`,
            `**❯ Boost Tier:** ${guild.premiumTier ? `Tier ${guild.premiumTier}` : "None"}`,
            `**❯ Creation Date:** ${moment(guild.createdTimestamp).format("LT")}, ${moment(
                guild.createdTimestamp
            ).format("LL")} (${moment(guild.createdTimestamp).fromNow()})`,
            "\u200b"
        ])
        .addField(
            "Statistics",
            [
                `**❯ Role Count:** ${roles.length}`,
                `**❯ Emoji Count:** ${serverEmojis.size} (${
                    serverEmojis.filter((emoji) => emoji.animated).size
                } animated)`,
                `**❯ Member Count:** ${guild.memberCount} (${members.filter((member) => member.user.bot).size} bots)`,
                `**❯ Text Channels:** ${channels.filter((channel) => channel.type === "text").size}`,
                `**❯ Voice Channels:** ${channels.filter((channel) => channel.type === "voice").size}`,
                `**❯ Boost Count:** ${guild.premiumSubscriptionCount || "0"}`,
                "\u200b"
            ],
            true
        )
        .addField(
            "Presence",
            [
                `**❯ Online:** ${members.filter((member) => member.presence.status === "online").size}`,
                `**❯ Idle:** ${members.filter((member) => member.presence.status === "idle").size}`,
                `**❯ Do Not Disturb:** ${members.filter((member) => member.presence.status === "dnd").size}`,
                `**❯ Offline:** ${members.filter((member) => member.presence.status === "offline").size}`
            ],
            true
        )
        .setFooter("Last updated")
        .setTimestamp();

    return serverInfo;
};
