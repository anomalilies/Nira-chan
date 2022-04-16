import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";

module.exports = {
  data: new SlashCommandBuilder().setName("repo").setDescription("Get the link to Nira-chan's GitHub repository."),
  async execute(interaction: CommandInteraction) {
    return interaction.reply("https://github.com/anomalilies/Nira-chan");
  },
};
