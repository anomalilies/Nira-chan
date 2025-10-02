import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";

export const data = new SlashCommandBuilder()
    .setName("uncle");

export async function execute(interaction: CommandInteraction) {
    const randomNumber = Math.floor(Math.random() * 12) + 1;

    await interaction.reply(`Abrar's uncle is coming in ${randomNumber} day(s).`);
}
