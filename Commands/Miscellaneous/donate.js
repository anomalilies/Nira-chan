const Commando = require("discord.js-commando");
const configFileName = process.env.NIRA_DEV ? 'config.dev.json' : 'config.json';
const { homeguild } = require(`../../${configFileName}`);
const { MessageEmbed } = require("discord.js");

module.exports = class DonateCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: "donate",
            aliases: ["support"],
            group: "misc",
            memberName: "donate",
            description: "Support the ZONE!",
        });
    }

    async run(message) {
        if (message.guild.id === homeguild) {
            const embed = new MessageEmbed()
                .setTitle(`Support ${message.guild.name}`)
                .setThumbnail(message.guild.iconURL({ dynamic: true }))
                .addField("Donations", "If you'd like to support the ZONE by finanically funding giveaways, **check out our __[Ko-fi](https://ko-fi.com/uniguri)__**!")
                .setColor(15849719)
                .setFooter("Thank you!");
            message.channel.send(embed);
        }
    }
};