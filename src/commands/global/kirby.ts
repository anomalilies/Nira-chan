import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, MessageEmbed } from "discord.js";
import { nicknameCheck } from "../../util/nicknameCheck";
import { emojis, colour } from "../../config/config.json";
import abilities from "../../data/copyabilities.json";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kirby")
    .setDescription("What copy ability will Kirby get when he inhales you?"),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

    const avatar = nicknameCheck(interaction).avatar;
    const nickname = nicknameCheck(interaction).nickname;

    const reply = group!.format.replace("{ability}", ability).replace("{name}", nickname);

    const embed = new MessageEmbed()
      .setColor(colour)
      .setAuthor({ name: nickname, iconURL: avatar })
      .setDescription(`${emojis.kirbsucc} ${reply}`);

    return interaction.reply({ embeds: [embed] });
  },
};
