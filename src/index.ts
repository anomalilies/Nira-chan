/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
require("dotenv").config();
import fs from "node:fs";
import { Client, Collection, Intents, Interaction } from "discord.js";
import { ownerId, guildId } from "./config/config.json";

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

const commands = new Collection();
const commandFiles = fs.readdirSync("./src/commands").filter((file) => file.endsWith(".js") || file.endsWith(".ts"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.set(command.data.name, command);
}

client.on("ready", async () => {
  const command: any = await client.guilds.cache.get(guildId)?.commands.fetch("955566413714702336");
  if (command.defaultPermission === false) {
    const permissions = [
      {
        id: ownerId,
        type: "USER",
        permission: true,
      },
    ];

    await command.permissions.add({ permissions });
  }
});

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
