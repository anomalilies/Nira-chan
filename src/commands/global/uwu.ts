import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import { uwuify } from "../../util/uwuTranslator/uwuify";
import { emojis } from "../../config/config.json";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("uwu")
    .setDescription("Uwu-ify your message!")
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .addStringOption((option: any) =>
      option.setName("message").setDescription("What would you like to translate?").setRequired(true),
    ),
  async execute(interaction: CommandInteraction) {
    const text: string = interaction.options.getString("message")!;

    interaction.reply(emojis.loading);
    interaction.deleteReply().then(async () => await uwuify(text, interaction));
  },
};
