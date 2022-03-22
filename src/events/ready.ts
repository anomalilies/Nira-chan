import { Client } from "discord.js";

module.exports = {
  name: "ready",
  once: true,
  execute(client: Client) {
    console.log(`${client.user.tag} activated!`);
  },
};
