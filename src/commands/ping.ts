import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";

module.exports = {
  data: new SlashCommandBuilder().setName("ping").setDescription("Check if Nira is alive."),
  async execute(interaction: CommandInteraction) {
    return interaction.reply({ content: "Pong! 🏓", ephemeral: true });
  },
};
