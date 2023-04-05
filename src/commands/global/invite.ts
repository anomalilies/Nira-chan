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
import { colour, guildId, invite } from "../../config/config.json";
import { getAuthorData } from "../../util/profile";

module.exports = {
  data: new SlashCommandBuilder().setName("invite").setDescription("Create an invitation."),
  async execute(interaction: CommandInteraction) {
    const botName = interaction.client.user!.username;
    const botID = interaction.client.user!.id;

    const botInvite = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setLabel(`Invite ${botName}`)
        .setStyle(ButtonStyle.Link)
        .setURL(
          `https://discord.com/api/oauth2/authorize?client_id=${botID}&permissions=805661760&scope=bot%20applications.commands`,
        ),
    );

    if (interaction.guild?.id === guildId) {
      const guildName = interaction.guild?.name;

      const embed = new EmbedBuilder()
        .setColor(colour)
        .setAuthor(getAuthorData(interaction))
        .setTitle("Invite")
        .setDescription(
          `Would you like to **invite <@${botID}>** to a server,
        or share **${guildName}'s invite link**?`,
        );

      const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
        new ButtonBuilder().setCustomId("bot").setLabel(botName).setStyle(ButtonStyle.Primary),
        new ButtonBuilder().setCustomId("guild").setLabel(guildName).setStyle(ButtonStyle.Primary),
      );
      const message = await interaction.reply({
        embeds: [embed],
        components: [row],
      });

      const code = (await interaction.guild.fetchVanityData()).code || invite;
      const guildInvite = `https://discord.gg/${code}`;

      const filter = (i: ButtonInteraction) => i.user.id === interaction.user.id;
      const collector = message.createMessageComponentCollector<ComponentType.Button>({ filter, max: 1, time: 60000 });

      collector.on("collect", async (i) => {
        if (i.customId === "bot") {
          i.update({ embeds: [], components: [botInvite] });
        } else if (i.customId === "guild") {
          i.update({ content: guildInvite, embeds: [], components: [] });
        }
      });
    } else {
      return interaction.reply({ components: [botInvite] });
    }
  },
};
