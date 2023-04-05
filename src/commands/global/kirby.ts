import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, EmbedBuilder } from "discord.js";
import { emojis, colour } from "../../config/config.json";
import abilities from "../../data/copyabilities.json";
import { getAuthorData } from "../../util/profile";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kirby")
    .setDescription("What copy ability will Kirby get when he inhales you?"),
  async execute(interaction: CommandInteraction) {
    const total = abilities.reduce((acc, cur) => acc + cur.weight, 0);
    const threshold = Math.random() * total;

    let sum = 0;
    const group = abilities.find((group) => {
      sum += group.weight;
      return sum >= threshold;
    });

    const index = Math.floor(Math.random() * group!.abilities.length);
    const ability = group!.abilities[index];

    const author = getAuthorData(interaction);
    const reply = group!.format.replace("{ability}", ability).replace("{name}", author.name);
    const embed = new EmbedBuilder().setColor(colour).setAuthor(author).setDescription(`${emojis.kirbsucc} ${reply}`);

    return interaction.reply({ embeds: [embed] });
  },
};
