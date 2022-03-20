/* eslint-disable @typescript-eslint/no-var-requires */
import fs from "node:fs";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { guildId } from "./config/config.json";
import { Client, Intents } from "discord.js";

const commands = [];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const commandFiles = fs.readdirSync("./commands").filter((file: any) => file.endsWith(".ts"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: "9" }).setToken(process.env.CLIENT_TOKEN);

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
client.login(process.env.CLIENT_TOKEN);

rest
  .put(Routes.applicationGuildCommands(client.user.id, guildId), { body: commands })
  .then(() => console.log("Successfully registered application commands."))
  .catch(console.error);
