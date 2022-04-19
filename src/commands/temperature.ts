/* eslint-disable @typescript-eslint/no-explicit-any */
import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, MessageEmbed } from "discord.js";
import { colour } from "../config/config.json";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("temperature")
    .setDescription("Convert a temperature from Celsius to Fahrenheit, and vice-versa.")
    .addNumberOption((option: any) =>
      option.setName("value").setDescription("The value of the temperature you're converting from.").setRequired(true),
    )
    .addStringOption((option: any) =>
      option
        .setName("unit")
        .setDescription("The unit of temperature you're converting from.")
        .setRequired(true)
        .addChoice("°C", "C")
        .addChoice("°F", "F"),
    ),
  async execute(interaction: CommandInteraction) {
    const value = interaction.options.getNumber("value");
    const unit = interaction.options.getString("unit");

    let toUnit: string;
    let response: string;

    if (unit === "C") {
      toUnit = "F";
      response = `${(value * (9 / 5) + 32).toFixed(1)}°${toUnit}`;
    } else {
      toUnit = "C";
      response = `${(((value - 32) * 5) / 9).toFixed(1)}°${toUnit}`;
    }

    let nickname: string;
    let avatar: string;

    if (interaction.inGuild()) {
      const userId = interaction.guild.members.cache.find((user) => user.id === interaction.user.id);
      nickname = userId.displayName;
      avatar = userId.displayAvatarURL({ dynamic: true });
    } else {
      nickname = interaction.user.username;
      avatar = interaction.user.avatarURL({ dynamic: true });
    }

    const embed = new MessageEmbed()
      .setColor(colour)
      .setAuthor({ name: `🌡️ ${value}°${unit} equals:` })
      .setTitle(response)
      .setFooter({ text: nickname, iconURL: avatar });

    interaction.reply({ embeds: [embed] });
  },
};
