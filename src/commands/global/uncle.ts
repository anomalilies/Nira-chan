import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("uncle")
    .setDescription("Check when Abrar's uncle is next stealing his bed."),
  async execute(interaction: CommandInteraction) {
    const randomNumber = Math.floor(Math.random() * 12) + 1;
    const s = randomNumber > 1 ? "s" : "";
    return interaction.reply(`Abrar's uncle is coming in ${randomNumber} day${s}.`);
  },
};
