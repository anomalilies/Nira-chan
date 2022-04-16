import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import { emojis } from "../config/config.json";

module.exports = {
  data: new SlashCommandBuilder().setName("despair").setDescription("Express despair the Nira way."),
  async execute(interaction: CommandInteraction) {
    const responses = [
      "Fuck Typescript; All my homies hate Typescript.",
      "Why are we still here? Just to suffer?",
      "Aaaa, the tape is rewinding so fast!",
    ];

    return interaction.reply(responses[Math.floor(Math.random() * responses.length)].concat(` ${emojis.despair}`));
  },
};
