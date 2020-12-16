const { emojis } = require("../config.json");
const { MessageEmbed } = require("discord.js");

module.exports = (client, member) => {
    if (member.guild.id === "603246092402032670") {
        member.guild.channels.cache.get("603246092402032673").send(emojis.wave)
        .then(() => {
            if (Math.random < 1/100) {
                const embed = new MessageEmbed()
                .setDescription("Attention all ZUTOMAYO stans!\n<@740606402330099752> is in trouble! She needs your help to pay for intensive therapy to relieve the burdens of her past traumas.\nAll she needs is your mum's credit card number, the expiration date, and those 3 *wacky* numbers on the back!\nHurry, and click that shiny 'Server Boost' button **__NOW__!** <:niragun:772343025099603988>")
                .setColor(15849719);
                message.channel.send(embed)
            }
        });
        var newbiesRole = member.guild.roles.cache.find(role => role.name === "Newbies");
        member.roles.add(newbiesRole);
    }
};