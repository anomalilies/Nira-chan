import { CommandInteraction, MessageEmbed, TextChannel } from "discord.js";
import emotions from "./data";
import { colour } from "../../config/config.json";

export const uwuify = async function (text: string, interaction: CommandInteraction) {
  if (text.slice(-1) == " ") text = text.substring(0, text.length - 1);

  emotions.forEach((emoteClass) => {
    emoteClass[0].forEach((pattern) => {
      text = text.replace(
        new RegExp(`\\b${pattern}\\b`, "gi"),
        () => emoteClass[1][Math.floor(Math.random() * emoteClass[1].length)],
      );
    });
  });

  text = text.replace(/(?!a?:\w+:\d+>*?)(r|l)(?![^<]*>)/g, "w");
  text = text.replace(/(?!a?:\w+:\d+>*?)(R|L)(?![^<]*>)/g, "W");
  text = text.replace(/(?!a?:\w+:\d+>*?)n([aeiou])(?![^<]*>)/g, "ny$1");
  text = text.replace(/(?!a?:\w+:\d+>*?)N([aeiou])(?![^<]*>)/g, "Ny$1");
  text = text.replace(/(?!a?:\w+:\d+>*?)N([AEIOU])(?![^<]*>)/g, "NY$1");
  text = text.replace(/(?!a?:\w+:\d+>*?)(ove)(?![^<]*>)/g, "uv");
  text = text.replace(/(?!a?:\w+:\d+>*?)(OVE)(?![^<]*>)/g, "UV");

  if (text[0].match(/[a-z]/i)) text = text[0] + "-" + text;
  if (text[text.length - 1].match(/[a-z]/i)) text = text + "~~";

  let nickname: string;
  let avatar: string;

  if (interaction.inGuild()) {
    const userId = interaction.guild.members.cache.find((user) => user.id === interaction.user.id);
    nickname = userId.displayName;
    avatar = userId.displayAvatarURL({ dynamic: true });

    const channel = (await interaction.client.channels.fetch(interaction.channel.id)) as TextChannel;
    const webhooks = await channel.fetchWebhooks();
    let webhook = webhooks.find((w) => w.token != null);

    if (!webhook) {
      webhook = await channel.createWebhook("Nira-chan", {
        avatar: interaction.client.user.avatarURL(),
      });
    }

    await webhook.send({
      content: text,
      username: nickname,
      avatarURL: avatar,
    });
  } else {
    nickname = interaction.user.username;
    avatar = interaction.user.avatarURL({ dynamic: true });

    const embed = new MessageEmbed()
      .setColor(colour)
      .setAuthor({ name: nickname, iconURL: avatar })
      .setDescription(text);

    return interaction.reply({ embeds: [embed] });
  }
};
