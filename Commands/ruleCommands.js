module.exports = async (client, id = []) => {
    const channel = await client.channels.fetch(id)

    const ruleEmbed = new Discord.MessageEmbed()
    .setTitle("7. Support ZUTOMAYO Wherever Possible")
    .setDescription("These commands will only work if you are in a voice channel!\nSpotify, Apple Music, and YouTube links are all supported!")
    .addFields(
        {name: "Moderation", value: "We will always share links and information on how you can support the band, whether financially or otherwise, so please check them out when they become available!\nAs a server, we also strive on being able to provide exclusive content that is hard-to-find outside of Japan for international fans wherever possible.\nHowever, illegal piracy of copyrighted goods, particularly those of that are easily accessible (including, but not limited to, CD rips), will **not** be tolerated.\n\nPlease be aware that links our members generously provide will be monitored to uphold these standards, and can therefore be removed at any time.**"}
    )
  
    channel.messages.fetch("768553524945616926")
        .then(messages => {
            messages.edit(ruleEmbed);
        }
    );
}