import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, EmbedBuilder } from "discord.js";
import { colour } from "../../config/config.json";
import { getAuthorData } from "../../util/profile";

module.exports = {
  data: new SlashCommandBuilder().setName("servercount").setDescription("Find out how many servers Nira is in."),
  async execute(interaction: CommandInteraction) {
    const embed = new EmbedBuilder()
      .setColor(colour)
      .setAuthor(getAuthorData(interaction))
      .setDescription(
        `<@!${interaction.client.user!.id}> is currently in **${interaction.client.guilds.cache.size} servers**!`,
      )
      .setTimestamp();

    return interaction.reply({ embeds: [embed] });
  },
};
