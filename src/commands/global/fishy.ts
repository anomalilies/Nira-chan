/* eslint-disable @typescript-eslint/no-explicit-any */
import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, MessageEmbed } from "discord.js";
import { PrismaClient } from "@prisma/client";
import { colour } from "../../config/config.json";
import moment from "moment";
import * as crypto from "crypto";
import fish from "../../data/fish.json";

const prisma = new PrismaClient();
type FishyStat = "totalTrash" | "totalCommon" | "totalUncommon" | "totalRare" | "totalLegendary";

module.exports = {
  _data: new SlashCommandBuilder()
    .setName("fishy")
    .setDescription("Go fishing!")
    .addStringOption((option: any) => option.setName("name").setDescription("Who you want to fish for.")),
  get data() {
    return this._data;
  },
  set data(value) {
    this._data = value;
  },

  async execute(interaction: CommandInteraction) {
    if (!interaction.inCachedGuild()) return;

    await interaction.deferReply({ fetchReply: true });
    const name: string = interaction.options.getString("name")!;

    let gift = false;
    let userID: string;

    if (!name) {
      userID = interaction.user.id;
    } else {
      gift = true;
      userID = name.replace(/[\s,<@!>]/g, "");
    }
    const user = await interaction.guild!.members.cache.find((user) => user.id === userID)!;

    if (user !== undefined) {
      const target = await prisma.fishy.upsert({
        where: { userId: user.id },
        update: {},
        create: { userId: user.id, lastFish: "1970-01-01T00:00:00.000Z" },
      });

      const ogAuthor = (await prisma.fishy.upsert({
        where: { userId: interaction.user.id },
        update: {},
        create: { userId: interaction.user.id },
      })) as any;

      let canFish = false;
      if (gift === true) {
        if (ogAuthor.timesFished === null || Date.now() >= ogAuthor.lastFish.getTime() + 7200000) {
          canFish = true;
        }
      } else if (target.timesFished === null || Date.now() >= target.lastFish!.getTime() + 7200000) {
        canFish = true;
      }

      if (canFish === true) {
        const total = fish.reduce((acc, cur) => acc + cur.weight, 0);
        const threshold = crypto.randomInt(total);

        let sum = 0;
        const group = fish.find((group) => {
          sum += group.weight;
          return sum > threshold;
        })!;

        const index = crypto.randomInt(group.puns.length);
        const fishPun = group.puns[index];

        let amount: number;
        let reply: string;

        if (group.type === "totalTrash") {
          amount = 0;
          reply = group.catch;
        } else {
          amount = crypto.randomInt(group.min!, group.max! + 1);
          reply = group.catch.replace("{amount}", amount.toString());
        }

        const newTotal = (await prisma.fishy.update({
          where: {
            userId: target.userId,
          },
          data: {
            totalFish: target.totalFish! + amount,
            timesFished: target.timesFished! + 1,
            [group.type]: target[group.type as FishyStat] + 1,
          },
        })) as any;

        const embed = new MessageEmbed()
          .setColor(colour)
          .setTitle(reply)
          .addFields([
            {
              name: "Mr. Fish says...",
              value: `> ${fishPun}`,
            },
          ])
          .setFooter({
            text: `${user.user.tag} has ${newTotal.totalFish} fishy`,
            iconURL: user.displayAvatarURL({ dynamic: true }),
          })
          .setTimestamp();

        const message = await interaction.editReply({
          embeds: [embed],
        });
        message.react(group.reaction);

        const time = new Date();
        if (gift === true) {
          await prisma.fishy.update({
            where: {
              userId: ogAuthor.userId,
            },
            data: {
              totalFishGifted: ogAuthor.totalFishGifted + amount,
              timesFished: ogAuthor.timesFished + 1,
              lastFish: time.toISOString(),
            },
          });
        } else {
          await prisma.fishy.update({
            where: {
              userId: target.userId,
            },
            data: {
              lastFish: time.toISOString(),
            },
          });
        }

        if (target.biggestFish === 0 || amount > target.biggestFish!) {
          await prisma.fishy.update({
            where: {
              userId: target.userId,
            },
            data: {
              biggestFish: amount,
            },
          });
        }
      } else {
        const timerEmbed = new MessageEmbed()
          .setColor(colour)
          .setTitle("Hold Up!")
          .setDescription(
            `You need to wait **${moment
              .duration(ogAuthor.lastFish.getTime() + 7200000 - Date.now())
              .humanize()}** to fish again.`,
          );

        await interaction.editReply({
          embeds: [timerEmbed],
        });
      }
    }
  },
};
