import * as dotenv from "dotenv";
dotenv.config();

import { REST, Routes } from "discord.js";
import { loadModules } from "./loader";
import { Command } from "./commands/command";
import { clientId, guildId } from "./config/config.json";

if (process.env.CLIENT_TOKEN === undefined) {
  console.log("CLIENT_TOKEN is not set");
  process.exit(1);
}

(async (token) => {
  const globalCommands = await loadModules<Command>("./commands/global");
  const guildCommands = await loadModules<Command>("./commands/guild");

  const globalCommandsJSON = globalCommands.map((command) => command.data.toJSON());
  const guildCommandsJSON = guildCommands.map((command) => command.data.toJSON());

  const rest = new REST({ version: "10" }).setToken(token);

  rest
    .put(Routes.applicationCommands(clientId), { body: globalCommandsJSON })
    .then(() => console.log("Global command registration successful!"))
    .catch(console.error);

  rest
    .put(Routes.applicationGuildCommands(clientId, guildId), { body: guildCommandsJSON })
    .then(() => console.log("Guild command registration successful!"))
    .catch(console.error);
})(process.env.CLIENT_TOKEN);
