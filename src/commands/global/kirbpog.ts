import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import { stripIndents } from "common-tags";
import { emojis } from "../../config/config.json";

module.exports = {
  data: new SlashCommandBuilder().setName("kirbpog").setDescription("Poggers."),
  async execute(interaction: CommandInteraction) {
    return interaction.reply(stripIndents`
      ${emojis.kirbsucc} <:poggers:764300262290358282>
      <:kirbful:757290594618966146>
      <:kirbpog:764299282664521729>
    `);
  },
};
