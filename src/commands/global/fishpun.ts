import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, MessageEmbed } from "discord.js";
import { colour, guildId } from "../../config/config.json";
import fishpuns from "../../data/fishpuns.json";

module.exports = {
  data: new SlashCommandBuilder().setName("fishpun").setDescription("Something seems fishy about this command..."),
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
      .setTitle("Mr. Fish says...")
      .setDescription(fishpuns[Math.floor(Math.random() * fishpuns.length)])
      .setThumbnail("https://raw.githubusercontent.com/anomalilies/Nira-chan/master/Images/Fishy.jpg");

    if (interaction.guild.id === guildId) {
      embed.setFooter({ text: "Mr. Fish ≠ Mr. Fis" });
    }

    return interaction.reply({ embeds: [embed] });
  },
};
