import { CommandInteraction, MessageEmbed, TextChannel, DMChannel } from "discord.js";
import { nicknameCheck } from "../nicknameCheck";
import { colour } from "../../config/config.json";
import emotions from "./data";

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

  const avatar = nicknameCheck(interaction).avatar;
  const nickname = nicknameCheck(interaction).nickname;

  if (interaction.inGuild()) {
    const channel = (await interaction.client.channels.fetch(interaction.channel!.id)) as TextChannel;
    const webhooks = await channel.fetchWebhooks();
    let webhook = webhooks.find((w) => w.token != null);

    if (!webhook) {
      webhook = await channel.createWebhook("Nira-chan", {
        avatar: interaction.client.user!.avatarURL(),
      });
    }

    await webhook.send({
      content: text,
      username: nickname,
      avatarURL: avatar,
    });
  } else {
    const channel = (await interaction.user.createDM()) as DMChannel;

    const embed = new MessageEmbed()
      .setColor(colour)
      .setAuthor({ name: nickname, iconURL: avatar })
      .setDescription(text);

    return channel.send({ embeds: [embed] });
  }
};
