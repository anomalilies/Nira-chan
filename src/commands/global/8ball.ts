import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, EmbedBuilder } from "discord.js";
import responses from "../../data/8ball.json";
import { colour } from "../../config/config.json";
import { getAuthorData } from "../../util/profile";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("8ball")
    .setDescription("Ask Nira for advice to all of your life's woes.")
    .addStringOption((option) =>
      option.setName("query").setDescription("What do you want to ask Nira?").setRequired(true),
    ),
  async execute(interaction: CommandInteraction) {
    if (!interaction.isChatInputCommand()) return;
    let query = interaction.options.getString("query")!;

    if (!query.endsWith("?")) {
      query = query.concat("?");
    }

    const author = getAuthorData(interaction);
    author.name = `${author.name} asked...`;

    const embed = new EmbedBuilder()
      .setColor(colour)
      .setAuthor(author)
      .setDescription(
        `> **${query}**\n\nNira-chan's magic 8-ball responds: **${
          responses[Math.floor(Math.random() * responses.length)]
        }**`,
      );

    return interaction.reply({ embeds: [embed] });
  },
};
