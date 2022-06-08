import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, MessageEmbed } from "discord.js";
import { nicknameCheck } from "../../util/nicknameCheck";
import responses from "../../data/8ball.json";
import { colour } from "../../config/config.json";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("8ball")
    .setDescription("Ask Nira for advice to all of your life's woes.")
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .addStringOption((option: any) =>
      option.setName("query").setDescription("What do you want to ask Nira?").setRequired(true),
    ),
  async execute(interaction: CommandInteraction) {
    let query: string = interaction.options.getString("query")!;

    const avatar = nicknameCheck(interaction).avatar;
    const nickname = nicknameCheck(interaction).nickname;

    if (!query.endsWith("?")) {
      query = query.concat("?");
    }

    const embed = new MessageEmbed()
      .setColor(colour)
      .setAuthor({ name: `${nickname} asked...`, iconURL: avatar })
      .setDescription(
        `> **${query}**\n\nNira-chan's magic 8-ball responds: **${
          responses[Math.floor(Math.random() * responses.length)]
        }**`,
      );

    return interaction.reply({ embeds: [embed] });
  },
};
