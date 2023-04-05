import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import { ownerId, emojis } from "../../config/config.json";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("say")
    .setDescription("Let Nira speak her mind.")
    .addStringOption((option) => option.setName("message").setDescription("[REDACTED]").setRequired(true)),
  async execute(interaction: CommandInteraction) {
    if (!interaction.isChatInputCommand()) return;
    if (!interaction.channel) return;
    const message = interaction.options.getString("message");

    if (!interaction.inGuild() || interaction.user.id === ownerId) {
      if (!interaction.channel!.isVoiceBased()) {
        interaction.channel!.sendTyping();
      }
      if (!interaction.inGuild()) {
        interaction.reply(emojis.loading).then(() => interaction.deleteReply());

        const channel = await interaction.user.createDM();
        return channel.send(message!);
      } else {
        interaction.deferReply({ ephemeral: true });

        const channel = interaction.channel!;
        await channel.sendTyping();
        setTimeout(() => {
          return channel.send(message!);
        }, 1350);
      }
    } else {
      interaction.reply({ content: "This command can only be used by the bot owner!", ephemeral: true });
    }
  },
};
