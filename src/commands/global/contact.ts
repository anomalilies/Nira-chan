import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, EmbedBuilder } from "discord.js";
import { colour, ownerId, invite } from "../../config/config.json";
import { getAuthorData } from "../../util/profile";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("contact")
    .setDescription("Get support in using Nira, and suggest new features."),
  async execute(interaction: CommandInteraction) {
    const embed = new EmbedBuilder()
      .setColor(colour)
      .setAuthor(getAuthorData(interaction))
      .setTitle("Support")
      .setDescription(
        `Need support in using <@!${
          interaction.client.user!.id
        }>?\nContact <@!${ownerId}> through DMs, or **through the support server found below**:`,
      )
      .addFields({ name: "Discord Server", value: `[Link](https://discord.gg/${invite})` })
      .setThumbnail("https://raw.githubusercontent.com/anomalilies/Nira-chan/master/Images/Nira.png");

    return interaction.reply({ embeds: [embed] });
  },
};
