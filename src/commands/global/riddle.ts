import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, MessageEmbed } from "discord.js";
import { colour } from "../../config/config.json";
import riddles from "../../data/riddles.json";

module.exports = {
  data: new SlashCommandBuilder().setName("riddle").setDescription("Really lousy riddles."),

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

    const i = Math.floor(Math.random() * riddles.length);

    const embed = new MessageEmbed()
      .setColor(colour)
      .setAuthor({ name: nickname, iconURL: avatar })
      .setDescription(riddles[i].riddle)
      .addFields({
        name: "Answer",
        value: `||${riddles[i].answer}||`,
      });

    return interaction.reply({ embeds: [embed] });
  },
};
