import { PrismaClient } from "@prisma/client";
import { CommandInteraction, SlashCommandBuilder } from "discord.js";

export interface Command {
  data: SlashCommandBuilder;
  execute(interaction: CommandInteraction, prisma: PrismaClient): Promise<void>;
}
