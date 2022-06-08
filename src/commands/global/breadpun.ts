/* eslint-disable @typescript-eslint/no-explicit-any */
import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, MessageEmbed } from "discord.js";
import { nicknameCheck } from "../../util/nicknameCheck";
import { colour } from "../../config/config.json";
import breadpuns from "../../data/breadpuns.json";

module.exports = {
  data: new SlashCommandBuilder().setName("breadpun").setDescription("Are you... Bready?"),
  async execute(interaction: CommandInteraction) {
    const avatar = nicknameCheck(interaction).avatar;
    const nickname = nicknameCheck(interaction).nickname;

    const embed = new MessageEmbed()
      .setColor(colour)
      .setTitle("The Mighty Loaf says...")
      .setAuthor({ name: nickname, iconURL: avatar })
      .setDescription(breadpuns[Math.floor(Math.random() * breadpuns.length)])
      .setThumbnail("https://cdn.discordapp.com/emojis/816811190034235423.png");
    return interaction.reply({ embeds: [embed] });
  },
};
