import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, MessageEmbed } from "discord.js";
import { colour, ownerId } from "../config/config.json";

module.exports = {
  data: new SlashCommandBuilder().setName("tos").setDescription("Review Nira's Terms of Service and Privacy Policy."),

  async execute(interaction: CommandInteraction) {
    let nickname: string;
    let avatar: string;

    if (interaction.inGuild()) {
      const userId = interaction.guild.members.cache.find((user) => user.id === interaction.user.id);
      nickname = userId.displayName;
      avatar = userId.displayAvatarURL({ dynamic: true });
    } else {
      nickname = interaction.user.username;
      avatar = interaction.user.avatarURL({ dynamic: true });
    }

    const embed = new MessageEmbed()
      .setColor(colour)
      .setAuthor({ name: nickname, iconURL: avatar })
      .addFields(
        {
          name: "Terms of Service",
          inline: true,
          value:
            "Nira's main, and most-popular, functionality allows users to use emojis from any server the bot is in without a Nitro subscription.\nHowever, by using Nira, you agree to not upload **hateful, degoratory, or NSFW emojis**, if you choose to opt-in to this feature.\nAny such offending content found will result in the permanent blacklist of your server's emojis from being used globally, or all servers the owner has the `Manage Emojis` permission in.\n\n**To opt in to global emoji sharing, use `/emojiauth`.**\nNote that you can change these settings at any time!" +
            `\n\nTo report an emoji, simply copy the ID, and contact <@${ownerId}> directly, either via DM or the ` +
            "`/contact` command.\nAll emojis available for global use can be accessed using the `/emojilist` command.",
        },
        {
          name: "Privacy Policy",
          inline: true,
          value:
            `Nira-chan, herefore referred to as "Nira" or "Nira-chan", does not store any personal information, with the only other information stored done so securely in a database protected by 2FA.
          \nThe database has 2 models in the schema, which store solely your fishing data and emoji authorisation choice respectively.
          This data is a mixture of integer and boolean values, and is only accessible by the bot owner, <@${ownerId}>.\n\nYour fishing data can be deleted at anytime, and your choice of opting in or out to Nira's emoji webhook command can also be changed at anytime by anyone in your guild who has the ` +
            "`Manage Server` " +
            `permission.
          Fishing data will be stored indefinitely until manually deleted.\n\n**By using Nira-chan, you agree to having *only* the aforementioned data stored.** 
          If you have any queries, please contact <@${ownerId}> at anytime via DM!`,
        },
      );

    return interaction.reply({ embeds: [embed] });
  },
};
