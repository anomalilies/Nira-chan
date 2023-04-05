import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import { emojis } from "../../config/config.json";
import yunyah from "../../data/yunyah.json";
import { getWebhook } from "../../util/webhook";

module.exports = {
  data: new SlashCommandBuilder().setName("yunyah").setDescription("is unigory part of zutto mayonaka cinama universe"),
  async execute(interaction: CommandInteraction) {
    const quote = yunyah[Math.floor(Math.random() * yunyah.length)];

    const channel = interaction.channel;
    if (channel && !channel.isDMBased() && !channel.isThread()) {
      const webhook = await getWebhook(channel);

      await interaction.reply(emojis.loading);
      await interaction.deleteReply();
      await webhook.send({
        content: quote,
        username: "yunyah",
        avatarURL: interaction.client.user!.defaultAvatarURL,
      });
    } else {
      await interaction.reply(quote);
    }
  },
};
