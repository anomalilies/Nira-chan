import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, EmbedBuilder } from "discord.js";
import { colour } from "../../config/config.json";
import { getFooterData } from "../../util/profile";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("temperature")
    .setDescription("Convert a temperature from Celsius to Fahrenheit, and vice-versa.")
    .addNumberOption((option) =>
      option.setName("value").setDescription("The value of the temperature you're converting from.").setRequired(true),
    )
    .addStringOption((option) =>
      option
        .setName("unit")
        .setDescription("The unit of temperature you're converting from.")
        .setRequired(true)
        .addChoices({ name: "°C", value: "C" }, { name: "°F", value: "F" }),
    ),
  async execute(interaction: CommandInteraction) {
    if (!interaction.isChatInputCommand()) return;
    const value = interaction.options.getNumber("value")!;
    const unit = interaction.options.getString("unit");

    let toUnit: string;
    let response: string;

    if (unit === "C" && value > -237.15) {
      toUnit = "F";
      response = `${(value * (9 / 5) + 32).toFixed(1)}°${toUnit}`;
    } else if (unit === "F" && value > -459.7) {
      toUnit = "C";
      response = `${(((value - 32) * 5) / 9).toFixed(1)}°${toUnit}`;
    } else {
      return interaction.reply({ content: "Invalid request.", ephemeral: true });
    }

    const embed = new EmbedBuilder()
      .setColor(colour)
      .setAuthor({ name: `🌡️ ${value}°${unit} equals:` })
      .setTitle(response)
      .setFooter(getFooterData(interaction));

    interaction.reply({ embeds: [embed] });
  },
};
