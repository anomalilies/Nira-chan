const Discord = require("discord.js");
const { allowlists } = require("../../config.json");

module.exports = {
    commands: ["akinator", "acanetor","acaねtor"],
    callback: (message) => {
        if (allowlists.botspamchannels.includes(message.channel.id)) {
            const embed = new Discord.MessageEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic:true}))
                .setDescription(
                    `I'm ${Math.floor(Math.random() * (99-75+1)+75)}% sure your character is...\n\nACAne (Singer)`
                )
                .setThumbnail("https://raw.githubusercontent.com/anomalilies/Nira-chan/master/Images/ACAne.png")
                .setFooter("Is this correct? (yes/no)")
                .setColor(240116);
            message.channel.send(embed);
            }
    },
}