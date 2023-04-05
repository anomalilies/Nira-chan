import { SlashCommandBuilder } from "@discordjs/builders";
import { oneLine } from "common-tags";
import { CommandInteraction, EmbedBuilder } from "discord.js";
import { colour, emojis } from "../../config/config.json";
import { getAuthorData } from "../../util/profile";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("dearmrf")
    .setDescription("Write your own personal letter to Mr. F.")
    .addStringOption((option) => option.setName("message").setDescription("Your message to Mr. F.").setRequired(true)),

  async execute(interaction: CommandInteraction) {
    if (!interaction.isChatInputCommand()) return;
    const message = interaction.options.getString("message")!;

    const author = getAuthorData(interaction);
    const embed = new EmbedBuilder()
      .setColor(colour)
      .setAuthor(author)
      .addFields(
        { name: "Dear Mr. F,", value: message },
        {
          name: "Your Response",
          value: oneLine`Mr. F, I have no idea what **${author.name}** is saying, but something 
          tells me you best pay really close attention! ${emojis.wince}`,
        },
      );

    return interaction.reply({ embeds: [embed] });
  },
};
