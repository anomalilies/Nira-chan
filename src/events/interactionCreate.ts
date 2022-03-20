import { Interaction } from "discord.js";

module.exports = {
  name: "interactionCreate",
  execute(interaction: Interaction) {
    console.log(`${interaction.user.tag} hates Typescript`);
  },
};
