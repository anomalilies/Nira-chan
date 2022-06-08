/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
require("dotenv").config();
import fs from "node:fs";
import { Client, Collection, Intents, Interaction } from "discord.js";

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

const commands = new Collection();
const guildCommandPath = __dirname + "/commands/guild/";
const globalCommandPath = __dirname + "/commands/global/";

const guildCommandFiles = fs
  .readdirSync(guildCommandPath)
  .filter((file: any) => file.endsWith(".js") || file.endsWith(".ts"));
const globalCommandFiles = fs
  .readdirSync(globalCommandPath)
  .filter((file: any) => file.endsWith(".js") || file.endsWith(".ts"));

let command: any;

for (const file of guildCommandFiles) {
  command = require(`./commands/guild/${file}`);
  commands.set(command.data.name, command);
}
for (const file of globalCommandFiles) {
  command = require(`./commands/global/${file}`);
  commands.set(command.data.name, command);
}

client.on("interactionCreate", async (interaction: Interaction) => {
  if (!interaction.isCommand()) return;

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
