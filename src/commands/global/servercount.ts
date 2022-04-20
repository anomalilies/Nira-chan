import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, MessageEmbed } from "discord.js";
import { colour } from "../../config/config.json";

module.exports = {
  data: new SlashCommandBuilder().setName("servercount").setDescription("Find out how many servers Nira is in."),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async execute(interaction: CommandInteraction) {
    let nickname: string;
    let avatar: string;

    if (interaction.inGuild()) {
      const userId = interaction.guild.members.cache.find((user) => user.id === interaction.user.id);
      nickname = userId.displayName;
      avatar = userId.displayAvatarURL({ dynamic: true });
    } else {
      nickname = interaction.user.username;
      avatar = interaction.user.avatarURL({ dynamic: true });
    }

    const embed = new MessageEmbed()
      .setColor(colour)
      .setAuthor({ name: nickname, iconURL: avatar })
      .setDescription(
        `<@!${interaction.client.user.id}> is currently in **${interaction.client.guilds.cache.size} servers**!`,
      )
      .setTimestamp();

    return interaction.reply({ embeds: [embed] });
  },
};
