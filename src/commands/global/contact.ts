import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, MessageEmbed } from "discord.js";
import { nicknameCheck } from "../../util/nicknameCheck";
import { colour, ownerId, invite } from "../../config/config.json";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("contact")
    .setDescription("Get support in using Nira, and suggest new features."),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async execute(interaction: CommandInteraction) {
    const avatar = nicknameCheck(interaction).avatar;
    const nickname = nicknameCheck(interaction).nickname;

    const embed = new MessageEmbed()
      .setColor(colour)
      .setAuthor({ name: nickname, iconURL: avatar })
      .setTitle("Support")
      .setDescription(
        `Need support in using <@!${
          interaction.client.user!.id
        }>?\nContact <@!${ownerId}> through DMs, or **through the support server found below**:`,
      )
      .addFields({ name: "Discord Server", value: `[Link](https://discord.gg/${invite})` })
      .setThumbnail("https://raw.githubusercontent.com/anomalilies/Nira-chan/master/Images/Nira.png");

    return interaction.reply({ embeds: [embed] });
  },
};
