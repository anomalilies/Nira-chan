import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, EmbedBuilder } from "discord.js";
import { colour, guildId } from "../../config/config.json";
import fishpuns from "../../data/fishpuns.json";
import { getAuthorData } from "../../util/profile";

module.exports = {
  data: new SlashCommandBuilder().setName("fishpun").setDescription("Something seems fishy about this command..."),
  async execute(interaction: CommandInteraction) {
    const embed = new EmbedBuilder()
      .setColor(colour)
      .setAuthor(getAuthorData(interaction))
      .setTitle("Mr. Fish says...")
      .setDescription(fishpuns[Math.floor(Math.random() * fishpuns.length)])
      .setThumbnail("https://raw.githubusercontent.com/anomalilies/Nira-chan/master/Images/Fishy.jpg");

    if (interaction.guild?.id === guildId) {
      embed.setFooter({ text: "Mr. Fish ≠ Mr. Fis" });
    }

    return interaction.reply({ embeds: [embed] });
  },
};
