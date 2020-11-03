const Discord = require("discord.js");
module.exports = async (client, id = []) => {
    const channel = await client.channels.fetch(id)

    const ruleEmbed = new Discord.MessageEmbed()
    .setTitle("6. Keep the Group’s Identity a Secret")
    .setDescription("Images can easily be found of the group's identities, particularly that of ACAね.\nHowever, since ZUTOMAYO have always been secretive by nature, we plan on upholding this standard due to the publicity of our server, and any information regarding the group's identity will be deleted *without warning*.\n\nWe suggest heading to our sister server, ZUTOMAYO Archive, for conversations of a similar nature.")
    .addFields(
        {name: "Moderation", value: "1. The content will be deleted immediately, and the user will be reminded of alternative options to post similar content.\n2. If the user's behaviour continues, they will be temporarily muted."}
    )
  
    channel.messages.fetch("768553524945616926")
        .then(messages => {
            messages.edit(ruleEmbed);
        }
    );
}