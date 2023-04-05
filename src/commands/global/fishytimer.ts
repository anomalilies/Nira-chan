import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, EmbedBuilder } from "discord.js";
import { PrismaClient } from "@prisma/client";
import { colour } from "../../config/config.json";
import moment from "moment";
import { getAuthorData } from "../../util/profile";

module.exports = {
  data: new SlashCommandBuilder().setName("fishytimer").setDescription("Check when you can next fish."),
  async execute(interaction: CommandInteraction, prisma: PrismaClient) {
    const user = interaction.guild!.members.cache.find((user) => user.id === interaction.user.id);

    if (user !== undefined) {
      const target = await prisma.fishy.findUnique({
        where: {
          userId: user.user.id,
        },
      });

      const defaultEmbed = new EmbedBuilder().setColor(colour).setAuthor(getAuthorData(interaction)).setTimestamp();

      if (target === null) {
        interaction.reply({
          embeds: [defaultEmbed.setTitle("Hold Up!").setDescription("You've never fished before!")],
          ephemeral: true,
        });
      } else {
        if (Date.now() >= target.lastFish!.getTime() + 7200000) {
          interaction.reply({
            embeds: [defaultEmbed.setTitle("Good News! ✨").setDescription("You can fish right now!")],
            ephemeral: true,
          });
        } else {
          const description = `You need to wait **${moment
            .duration(target.lastFish!.getTime() + 7200000 - Date.now())
            .humanize()}** to fish again.` as string;
          interaction.reply({
            embeds: [defaultEmbed.setTitle("Hold Up!").setDescription(description)],
            ephemeral: true,
          });
        }
      }
    }
  },
};
