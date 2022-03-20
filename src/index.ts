/* eslint-disable @typescript-eslint/no-var-requires */
require("dotenv").config();
import fs from "node:fs";
import { Client, Intents, Interaction } from "discord.js";

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let commands: any;

const commandFiles = fs.readdirSync("./src/commands").filter((file) => file.endsWith(".ts"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.set(command.data.name, command);
}

client.once("ready", () => {
  console.log("Ready!");
});

client.on("interactionCreate", async (interaction: Interaction) => {
  if (!interaction.isCommand()) return;

  const command = commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
  }
});

client.login(process.env.CLIENT_TOKEN);
