/* eslint-disable @typescript-eslint/no-explicit-any */
import { SlashCommandBuilder } from "@discordjs/builders";
import { TextChannel, DMChannel, CommandInteraction } from "discord.js";
import { ownerId, emojis } from "../../config/config.json";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("say")
    .setDescription("Let Nira speak her mind.")
    .setDefaultPermission(false)
    .addStringOption((option: any) => option.setName("message").setDescription("[REDACTED]").setRequired(true)),
  async execute(interaction: CommandInteraction) {
    if (!interaction.inGuild() || interaction.user.id === ownerId) {
      const message = interaction.options.getString("message");

      let channel: any;
      if (!interaction.inGuild()) {
        interaction.reply(emojis.loading).then(() => interaction.deleteReply());

        channel = (await interaction.user.createDM()) as DMChannel;
        return channel.send(message!);
      } else {
        interaction.deferReply({ ephemeral: true });

        channel = interaction.channel! as TextChannel;
        await channel.sendTyping();
        setTimeout(() => {
          return channel.send(message!);
        }, 1350);
      }
    } else {
      interaction.reply({ content: "This command can only be used by the bot owner!", ephemeral: true });
    }
  },
};
