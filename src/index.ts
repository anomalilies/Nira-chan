/* eslint-disable @typescript-eslint/no-var-requires */
require("dotenv").config();
import fs from "node:fs";
import { Client, Collection, Intents, Interaction } from "discord.js";

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

const commands = new Collection();
const commandFiles = fs.readdirSync("./src/commands").filter((file) => file.endsWith(".js" || ".ts"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.set(command.data.name, command);
}

client.once("ready", () => {
  console.log(`Ready!`);
});

client.on("interactionCreate", async (interaction: Interaction) => {
  if (!interaction.isCommand()) return;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const command: any = commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
  }
});

const eventFiles = fs.readdirSync("./src/events").filter((file) => file.endsWith(".js") || file.endsWith(".ts"));

for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

client.login(process.env.CLIENT_TOKEN);
