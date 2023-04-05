import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import { uwuify } from "../../util/uwuTranslator/uwuify";
import { emojis } from "../../config/config.json";
import { getWebhook } from "../../util/webhook";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("uwu")
    .setDescription("Uwu-ify your message!")
    .addStringOption((option) =>
      option.setName("message").setDescription("What would you like to translate?").setRequired(true),
    ),
  async execute(interaction: CommandInteraction) {
    if (!interaction.isChatInputCommand()) return;
    const text = interaction.options.getString("message")!;
    const uwuified = uwuify(text);

    const channel = interaction.channel;
    if (interaction.inCachedGuild() && channel && !channel.isDMBased() && !channel.isThread()) {
      const webhook = await getWebhook(channel);

      await interaction.reply(emojis.loading);
      await interaction.deleteReply();
      await webhook.send({
        content: uwuified,
        username: interaction.member.displayName,
        avatarURL: interaction.member.displayAvatarURL(),
      });
    } else {
      await interaction.reply(uwuified);
    }
  },
};
