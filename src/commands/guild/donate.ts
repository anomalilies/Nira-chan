import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, EmbedBuilder } from "discord.js";
import { colour } from "../../config/config.json";
import { getAuthorData } from "../../util/profile";

module.exports = {
  data: new SlashCommandBuilder().setName("donate").setDescription("Find out how to donate to ZUTOMAYO ZONE!"),
  async execute(interaction: CommandInteraction) {
    const embed = new EmbedBuilder()
      .setColor(colour)
      .setAuthor(getAuthorData(interaction))
      .setTitle("Donate")
      .setDescription(
        `If you'd like to support the ZONE by finanically funding giveaways, **check out our __[Ko-fi](https://ko-fi.com/uniguri)__**!`,
      );

    return interaction.reply({ embeds: [embed] });
  },
};
