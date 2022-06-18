import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, MessageEmbed } from "discord.js";
import { PrismaClient } from "@prisma/client";
import { colour } from "../../config/config.json";

const prisma = new PrismaClient();

module.exports = {
  data: new SlashCommandBuilder()
    .setName("fishystats")
    .setDescription("Group your previous catches by type.")
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .addStringOption((option: any) => option.setName("name").setDescription("Who you want to check the stats of.")),
  async execute(interaction: CommandInteraction) {
    const name: string = interaction.options.getString("name")!;
    let userID: string;

    if (!name) {
      userID = interaction.user.id;
    } else {
      userID = name.replace(/[\s,<@!>]/g, "");
    }
    const user = await interaction.guild!.members.cache.find((user) => user.id === userID)!;

    if (user !== undefined) {
      const target = await prisma.fishy.findUnique({
        where: {
          userId: user.id,
        },
      });

      if (target === null) {
        interaction.reply({
          content: "There's nothing to see here, but at least there's plenty more fish in the sea!",
          ephemeral: true,
        });
      } else {
        const averageFish = target.totalFish! / target.timesFished!;

        const statTypes = [target.totalFish, target.totalFishGifted, target.timesFished, target.biggestFish];
        const statHeaders = ["Total fishy", "Fishy gifted", "Times fished", "Biggest fish"];
        const statValues = [];
        for (const i in statHeaders) {
          statValues.push(`${statHeaders[i]}: **${statTypes[i]}**`);
        }

        const fishyTotals = [
          target.totalTrash,
          target.totalCommon,
          target.totalUncommon,
          target.totalRare,
          target.totalLegendary,
        ];
        const fishyTypes = ["Trash", "Common", "Uncommon", "Rare", "Legendary"];
        const rarityValues = [];
        for (const i in fishyTypes) {
          rarityValues.push(
            `${fishyTypes[i]}: **${fishyTotals[i]}** (${((fishyTotals[i] / target.timesFished!) * 100).toFixed(2)}%)`,
          );
        }

        const fishyStats = statValues.join("\n");
        const rarityStats = rarityValues.join("\n");

        const embed = new MessageEmbed()
          .setColor(colour)
          .setTitle("Fishy Stats 🎣")
          .setDescription(`${fishyStats}\nAverage fish: **${averageFish.toFixed(2)}**`)
          .addFields([
            {
              name: "Rarity Breakdown",
              value: rarityStats,
            },
          ])
          .setFooter({
            text: user.user.tag,
            iconURL: user.displayAvatarURL({ dynamic: true }),
          })
          .setTimestamp();

        return interaction.reply({ embeds: [embed] });
      }
    }
  },
};
