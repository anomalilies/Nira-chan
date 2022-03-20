import { SlashCommandBuilder } from "@discordjs/builders";

module.exports = {
  data: new SlashCommandBuilder().setName("ping").setDescription("Replies with Pong!"),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async execute(interaction: any) {
    return interaction.reply("Pong!");
  },
};
