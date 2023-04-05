import { SlashCommandBuilder } from "@discordjs/builders";
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonInteraction,
  ButtonStyle,
  CommandInteraction,
  ComponentType,
  EmbedBuilder,
} from "discord.js";
import { getAuthorData } from "../../util/profile";

module.exports = {
  data: new SlashCommandBuilder().setName("akinator").setDescription("Akinator... But with ACAね for once!"),
  async execute(interaction: CommandInteraction) {
    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder().setCustomId("yes").setLabel("Yes").setStyle(ButtonStyle.Success),
      new ButtonBuilder().setCustomId("no").setLabel("No").setStyle(ButtonStyle.Danger),
    );
    const percent = Math.floor(Math.random() * (99 - 75 + 1) + 75);

    const embed = new EmbedBuilder()
      .setAuthor(getAuthorData(interaction))
      .setDescription(`I'm ${percent}% sure your character is...\n\nACAね (Singer)`)
      .setThumbnail("https://raw.githubusercontent.com/anomalilies/Nira-chan/master/Images/ACAne.png");

    const altResponse = new EmbedBuilder().setAuthor(getAuthorData(interaction));

    const message = await interaction.reply({
      embeds: [embed.setColor("#03a9f4").setFooter({ text: "Is this correct?" })],
      components: [row],
    });

    const filter = (i: ButtonInteraction) => i.user.id === interaction.user.id;
    const collector = message.createMessageComponentCollector<ComponentType.Button>({ filter, max: 1, time: 60000 });

    collector.on("collect", async (i) => {
      if (i.customId === "yes") {
        embed.setColor("#3ea45d").setFooter({ text: "Great! I guessed correctly. I love playing with you!" });
        await i.update({ embeds: [embed], components: [] });
      } else if (i.customId === "no") {
        altResponse
          .setColor("#ec4447")
          .setDescription("I'm 100% sure your character is...\n\nDimelo Tony (Musician)")
          .setThumbnail("https://raw.githubusercontent.com/anomalilies/Nira-chan/master/Images/Dimelo%20Tony.jpg")
          .setFooter({ text: "You have no choice in the matter; This is correct." });
        await i.update({ embeds: [altResponse], components: [] });
      }
    });
  },
};
