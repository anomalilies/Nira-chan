import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import { emojis } from "../config/config.json";

module.exports = {
  data: new SlashCommandBuilder().setName("stabstabstab").setDescription(emojis.fencing),
  async execute(interaction: CommandInteraction) {
    return interaction.reply({ content: `pokepokepoke ${emojis.fencing}`, ephemeral: true });
  },
};
