import { SlashCommandBuilder } from "@discordjs/builders";
import { oneLine } from "common-tags";
import { CommandInteraction, MessageEmbed } from "discord.js";
import { colour, emojis } from "../../config/config.json";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("dearmrf")
    .setDescription("Write your own personal letter to Mr. F.")
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .addStringOption((option: any) =>
      option.setName("message").setDescription("Your message to Mr. F.").setRequired(true),
    ),

  async execute(interaction: CommandInteraction) {
    const message: string = interaction.options.getString("message");
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
        { name: "Dear Mr. F,", value: message },
        {
          name: "Your Response",
          value: oneLine`Mr. F, I have no idea what **${nickname}** is saying, but something 
          tells me you best pay really close attention! ${emojis.wince}`,
        },
      );

    return interaction.reply({ embeds: [embed] });
  },
};
