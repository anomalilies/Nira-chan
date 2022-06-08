/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
require("dotenv").config();

import fs from "node:fs";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { clientId, guildId } from "./config/config.json";
import { ownerId } from "./config/config.json";

const guildCommandPath = __dirname + "/commands/guild/";
const globalCommandPath = __dirname + "/commands/global/";

const guildCommands: any = [];
const globalCommands: any = [];

const guildCommandFiles = fs
  .readdirSync(guildCommandPath)
  .filter((file: any) => file.endsWith(".js") || file.endsWith(".ts"));
const globalCommandFiles = fs
  .readdirSync(globalCommandPath)
  .filter((file: any) => file.endsWith(".js") || file.endsWith(".ts"));

let command: any;
for (const file of guildCommandFiles) {
  command = require(`./commands/guild/${file}`);
  guildCommands.push(command.data.toJSON());
}
for (const file of globalCommandFiles) {
  command = require(`./commands/global/${file}`);
  if (file === "say.ts" || file === "say.js") {
    if (command.defaultPermission === false) {
      const permissions = [
        {
          id: ownerId,
          type: "USER",
          permission: true,
        },
      ];
      command.permissions.add({ permissions });
    }
  }
  globalCommands.push(command.data.toJSON());
}

const rest = new REST({ version: "9" }).setToken(process.env.CLIENT_TOKEN!);

rest
  .put(Routes.applicationGuildCommands(clientId, guildId), { body: guildCommands })
  .then(() => console.log("Guild command registration successful!"))
  .catch(console.error);

rest
  .put(Routes.applicationCommands(clientId), { body: globalCommands })
  .then(() => console.log("Global command registration successful!"))
  .catch(console.error);
