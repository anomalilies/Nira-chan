import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, MessageEmbed } from "discord.js";
import { nicknameCheck } from "../../util/nicknameCheck";
import { colour, guildId } from "../../config/config.json";
import fishpuns from "../../data/fishpuns.json";

module.exports = {
  data: new SlashCommandBuilder().setName("fishpun").setDescription("Something seems fishy about this command..."),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async execute(interaction: CommandInteraction) {
    const avatar = nicknameCheck(interaction).avatar;
    const nickname = nicknameCheck(interaction).nickname;

    const embed = new MessageEmbed()
      .setColor(colour)
      .setAuthor({ name: nickname, iconURL: avatar })
      .setTitle("Mr. Fish says...")
      .setDescription(fishpuns[Math.floor(Math.random() * fishpuns.length)])
      .setThumbnail("https://raw.githubusercontent.com/anomalilies/Nira-chan/master/Images/Fishy.jpg");

    if (interaction.guild?.id === guildId) {
      embed.setFooter({ text: "Mr. Fish ≠ Mr. Fis" });
    }

    return interaction.reply({ embeds: [embed] });
  },
};
