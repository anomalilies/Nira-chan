import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, MessageEmbed } from "discord.js";
import { colour, ownerId, invite } from "../config/config.json";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("contact")
    .setDescription("Get support in using Nira, and suggest new features."),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      .setTitle("Support")
      .setDescription(
        `Need support in using <@!${interaction.client.user.id}>?\nContact <@!${ownerId}> through DMs, or **through the support server found below**:`,
      )
      .addFields({ name: "Discord Server", value: `[Link](https://discord.gg/${invite})` });

    return interaction.reply({ embeds: [embed] });
  },
};
