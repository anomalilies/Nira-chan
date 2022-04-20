/* eslint-disable @typescript-eslint/no-explicit-any */
import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, MessageEmbed } from "discord.js";
import axios from "axios";
import { colour } from "../../config/config.json";
import currencies from "../../data/currencies.json";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("convert")
    .setDescription("Convert from one currency to another.")
    .addNumberOption((option: any) =>
      option.setName("value").setDescription("The value of the currency you're converting from.").setRequired(true),
    )
    .addStringOption((option: any) =>
      option
        .setName("fromcurrency")
        .setDescription("The three-letter currency code of the currency you would like to convert from.")
        .setRequired(true),
    )
    .addStringOption((option: any) =>
      option
        .setName("tocurrency")
        .setDescription("The three-letter currency code of the currency you would like to convert to.")
        .setRequired(true),
    ),
  async execute(interaction: CommandInteraction) {
    const value = interaction.options.getNumber("value");
    const fromCurrency = interaction.options.getString("fromcurrency").toUpperCase();
    const toCurrency = interaction.options.getString("tocurrency").toUpperCase();

    if (currencies.includes(toCurrency) && currencies.includes(fromCurrency) && toCurrency !== fromCurrency) {
      axios
        .get(`https://api.exchangerate.host/convert?from=${fromCurrency}&to=${toCurrency}&amount=${value}`)
        .then(async (res: any) => {
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

          const newValue = res.data.result.toFixed(2);

          const embed = new MessageEmbed()
            .setColor(colour)
            .setAuthor({ name: `💰 ${value} ${fromCurrency} equals:` })
            .setTitle(`${newValue} ${toCurrency}`)
            .setFooter({ text: nickname, iconURL: avatar })
            .setTimestamp();

          return interaction.reply({ embeds: [embed] });
        })
        .catch(() => {
          return interaction.reply({ content: "The API returned an error; Please try again!", ephemeral: true });
        });
    } else {
      return interaction.reply({ content: "Invalid request.", ephemeral: true });
    }
  },
};
