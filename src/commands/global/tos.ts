import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, EmbedBuilder } from "discord.js";
import { colour, ownerId } from "../../config/config.json";
import { getAuthorData } from "../../util/profile";

module.exports = {
  data: new SlashCommandBuilder().setName("tos").setDescription("Review Nira's Terms of Service and Privacy Policy."),

  async execute(interaction: CommandInteraction) {
    const embed = new EmbedBuilder()
      .setColor(colour)
      .setAuthor(getAuthorData(interaction))
      .addFields(
        {
          name: "Terms of Service",
          inline: true,
          value:
            "Nira's main, and most-popular, functionality allows users to use emojis from any server the bot is in without a Nitro subscription.\nHowever, by using Nira, you agree to not upload **hateful, degoratory, or NSFW emojis**, if you choose to opt-in to this feature.\nAny such offending content found will result in the permanent blacklisting of your server's emojis from being used globally, and/or all servers the owner has the `Manage Emojis` permission in.\n\n**To opt in to global emoji sharing, use `/emojiauth`.**\nNote that you can change these settings at any time!" +
            `\n\nPlease note that by opting in to this feature, the names of all your server's emojis can be accessed globally when using the ` +
            "`/emojilist`" +
            ` command.\n\nTo report an emoji, simply copy the ID, and contact <@${ownerId}> directly, either via DM or the ` +
            "`/contact` command." +
            `\n\nThanks for using <@${interaction.client.user!.id}>!`,
        },
        {
          name: "Privacy Policy",
          inline: true,
          value:
            `Nira-chan, herefore referred to as "Nira" or "Nira-chan", does not store any personal information, with the only other information stored done so securely in a database protected by 2FA.
          \nThe database solely stores your fishing data and emoji authorisation choice.
          This data is a mixture of integer and boolean values (non-personal information), and is only accessible by the bot owner, <@${ownerId}>.\n\nYour fishing data can be deleted at anytime using the` +
            "`/deletedata`" +
            ` command, and your choice of opting in or out to Nira's emoji webhook command can also be changed at anytime by anyone in your guild who has the ` +
            "`Manage Server` " +
            `permission.
          Fishing data will be stored indefinitely until manually deleted.\n\n**By using Nira-chan, you agree to having *only* the aforementioned data stored.** 
          If you have any queries, please contact <@${ownerId}> at anytime via DM!`,
        },
      )
      .setFooter({ text: "Last updated" })
      .setTimestamp();

    return interaction.reply({ embeds: [embed] });
  },
};
