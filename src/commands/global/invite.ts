/* eslint-disable @typescript-eslint/no-explicit-any */
import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } from "discord.js";
import { colour, guildId, invite } from "../../config/config.json";

module.exports = {
  data: new SlashCommandBuilder().setName("invite").setDescription("Create an invitation."),
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

    const guildName = interaction.guild.name as string;
    const botName = interaction.client.user.username as string;
    const botID = interaction.client.user.id as string;

    let guildInvite = "https://discord.gg/" as string;
    interaction.guild
      .fetchVanityData()
      .then((i) => {
        guildInvite = guildInvite.concat(i.code);
      })
      .catch(() => {
        guildInvite = guildInvite.concat(invite);
      });

    if (interaction.guild.id === guildId) {
      const embed = new MessageEmbed()
        .setColor(colour)
        .setAuthor({ name: nickname, iconURL: avatar })
        .setTitle("Invite")
        .setDescription(
          `Would you like to **invite <@${botID}>** to a server,
        or share **${guildName}'s invite link**?`,
        );

      const row = new MessageActionRow().addComponents(
        new MessageButton().setCustomId("bot").setLabel(botName).setStyle("PRIMARY"),
        new MessageButton().setCustomId("guild").setLabel(guildName).setStyle("PRIMARY"),
      );

      await interaction.reply({
        embeds: [embed],
        components: [row],
      });

      const filter = (i: any) => i.user.id === interaction.user.id;
      const collector = interaction.channel.createMessageComponentCollector({ filter, max: 1, time: 60000 });

      collector.on("collect", async (i) => {
        if (i.customId === "bot") {
          const botInvite = new MessageActionRow().addComponents(
            new MessageButton()
              .setLabel(`Invite ${botName}`)
              .setStyle("LINK")
              .setURL(`https://discord.com/api/oauth2/authorize?client_id=${botID}&permissions=805661760&scope=bot`),
          );

          return i.update({ embeds: [], components: [botInvite] });
        } else if (i.customId === "guild") {
          return i.update({ content: guildInvite, embeds: [], components: [] });
        }
      });
      collector.on("end", () => {
        for (let i = 0; i < row.components.length; i++) {
          row.components[i].setDisabled(true);
        }
        interaction.editReply({ components: [row] });
      });
    } else {
      return interaction.reply(guildInvite);
    }
  },
};
