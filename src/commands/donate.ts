import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, MessageEmbed } from "discord.js";
import { colour } from "../config/config.json";

module.exports = {
  data: new SlashCommandBuilder().setName("donate").setDescription("Find out how to donate to ZUTOMAYO ZONE!"),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async execute(interaction: CommandInteraction) {
    let nickname: string;
    let avatar: string;

    //guild only
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
      .setTitle("Donate")
      .setDescription(
        `If you'd like to support the ZONE by finanically funding giveaways, **check out our __[Ko-fi](https://ko-fi.com/uniguri)__**!`,
      );

    return interaction.reply({ embeds: [embed] });
  },
};
