import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, EmbedBuilder } from "discord.js";
import { colour } from "../../config/config.json";
import riddles from "../../data/riddles.json";
import { getAuthorData } from "../../util/profile";

module.exports = {
  data: new SlashCommandBuilder().setName("riddle").setDescription("Really lousy riddles."),

  async execute(interaction: CommandInteraction) {
    const i = Math.floor(Math.random() * riddles.length);

    const embed = new EmbedBuilder()
      .setColor(colour)
      .setAuthor(getAuthorData(interaction))
      .setDescription(riddles[i].riddle)
      .addFields({
        name: "Answer",
        value: `||${riddles[i].answer}||`,
      });

    return interaction.reply({ embeds: [embed] });
  },
};
