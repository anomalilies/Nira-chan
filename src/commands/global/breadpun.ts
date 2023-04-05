import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, EmbedBuilder } from "discord.js";
import { colour } from "../../config/config.json";
import breadpuns from "../../data/breadpuns.json";
import { getAuthorData } from "../../util/profile";

module.exports = {
  data: new SlashCommandBuilder().setName("breadpun").setDescription("Are you... Bready?"),
  async execute(interaction: CommandInteraction) {
    const embed = new EmbedBuilder()
      .setColor(colour)
      .setTitle("The Mighty Loaf says...")
      .setAuthor(getAuthorData(interaction))
      .setDescription(breadpuns[Math.floor(Math.random() * breadpuns.length)])
      .setThumbnail("https://cdn.discordapp.com/emojis/816811190034235423.png");
    return interaction.reply({ embeds: [embed] });
  },
};
