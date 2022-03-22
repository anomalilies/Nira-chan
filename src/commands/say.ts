import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("say")
    .setDescription("Let Nira speak her mind.")
    .setDefaultPermission(false)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .addStringOption((option: any) => option.setName("message").setDescription("[REDACTED]").setRequired(true)),
  async execute(interaction: CommandInteraction) {
    const message = interaction.options.getString("message");
    interaction.deferReply({ ephemeral: true });
    await interaction.channel.sendTyping();
    setTimeout(() => {
      return interaction.channel.send(message);
    }, 1350);
  },
};
