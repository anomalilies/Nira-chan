import * as dotenv from "dotenv";
dotenv.config();

import { Client, IntentsBitField } from "discord.js";
import { Command } from "./commands/command";
import { loadModules } from "./loader";
import { PrismaClient } from "@prisma/client";

if (process.env.CLIENT_TOKEN === undefined) {
  console.log("CLIENT_TOKEN is not set");
  process.exit(1);
}

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildEmojisAndStickers,
    IntentsBitField.Flags.GuildWebhooks,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildMessageReactions,
    IntentsBitField.Flags.DirectMessages,
    IntentsBitField.Flags.DirectMessageReactions,
  ],
});
const prisma = new PrismaClient();

const commands = new Map<string, Command>();

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction, prisma);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
  }
});

client.once("ready", () => console.log(`${client.user!.tag} activated!`));

(async (token) => {
  (await loadModules<Command>("./commands/global"))
    .concat(await loadModules<Command>("./commands/guild"))
    .forEach((command) => commands.set(command.data.name, command));

  client.login(token);
})(process.env.CLIENT_TOKEN);
