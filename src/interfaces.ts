import { PrismaClient } from "@prisma/client";
import { Client, CommandInteraction, SlashCommandBuilder } from "discord.js";

export interface Command {
  data: SlashCommandBuilder;
  execute(interaction: CommandInteraction, prisma: PrismaClient): Promise<void>;
}

export interface Module {
  register(client: Client, prisma: PrismaClient): void;
}
