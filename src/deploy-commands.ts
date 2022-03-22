/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
require("dotenv").config();

import fs from "node:fs";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { clientId, guildId } from "./config/config.json";

const commandPath = __dirname + "/commands/";

const commands: any = [];
const commandFiles = fs.readdirSync(commandPath).filter((file: any) => file.endsWith(".js") || file.endsWith(".ts"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: "9" }).setToken(process.env.CLIENT_TOKEN);

rest
  .put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
  .then(() => console.log("Command registration successful!"))
  .catch(console.error);
