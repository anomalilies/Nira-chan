/* eslint-disable @typescript-eslint/no-explicit-any */
import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, MessageEmbed } from "discord.js";
import { colour } from "../../config/config.json";
import axios from "axios";

module.exports = {
  data: new SlashCommandBuilder().setName("breadpun").setDescription("Are you... Bready?"),
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

    axios
      .get("https://my-bao-server.herokuapp.com/api/breadpuns")
      .then(async (res: any) => {
        const embed = new MessageEmbed()
          .setColor(colour)
          .setAuthor({ name: nickname, iconURL: avatar })
          .setDescription(res.data)
          .setThumbnail("https://cdn.discordapp.com/emojis/816811190034235423.png");
        return interaction.reply({ embeds: [embed] });
      })
      .catch(() => {
        return interaction.reply({ content: "The API returned an error; Please try again!", ephemeral: true });
      });
  },
};
