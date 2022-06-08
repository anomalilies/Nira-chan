import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, MessageEmbed } from "discord.js";
import { nicknameCheck } from "../../util/nicknameCheck";
import { colour } from "../../config/config.json";

module.exports = {
  data: new SlashCommandBuilder().setName("servercount").setDescription("Find out how many servers Nira is in."),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async execute(interaction: CommandInteraction) {
    const avatar = nicknameCheck(interaction).avatar;
    const nickname = nicknameCheck(interaction).nickname;

    const embed = new MessageEmbed()
      .setColor(colour)
      .setAuthor({ name: nickname, iconURL: avatar })
      .setDescription(
        `<@!${interaction.client.user!.id}> is currently in **${interaction.client.guilds.cache.size} servers**!`,
      )
      .setTimestamp();

    return interaction.reply({ embeds: [embed] });
  },
};
