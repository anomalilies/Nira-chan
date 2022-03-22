import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, MessageActionRow, MessageButton, MessageEmbed } from "discord.js";

module.exports = {
  data: new SlashCommandBuilder().setName("akinator").setDescription("Akinator... But with ACAね for once!"),
  async execute(interaction: CommandInteraction) {
    const row = new MessageActionRow().addComponents(
      new MessageButton().setCustomId("yes").setLabel("Yes").setStyle("SUCCESS"),
      new MessageButton().setCustomId("no").setLabel("No").setStyle("DANGER"),
    );
    const percent = Math.floor(Math.random() * (99 - 75 + 1) + 75);

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
      .setAuthor({ name: nickname, iconURL: avatar })
      .setDescription(`I'm ${percent}% sure your character is...\n\nACAね (Singer)`)
      .setThumbnail("https://raw.githubusercontent.com/anomalilies/Nira-chan/master/Images/ACAne.png");

    const altResponse = new MessageEmbed().setAuthor({ name: nickname, iconURL: avatar });

    await interaction.reply({
      embeds: [embed.setColor("#03a9f4").setFooter({ text: "Is this correct?" })],
      components: [row],
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filter = (i: any) => i.user.id === interaction.user.id;
    const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

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
    collector.on("end", () => {
      for (let i = 0; i < row.components.length; i++) {
        row.components[i].setDisabled(true);
      }
      interaction.editReply({ components: [row] });
    });
  },
};
