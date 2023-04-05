import { EmbedBuilder } from "@discordjs/builders";
import { stripIndent } from "common-tags";
import { Client, MessageType } from "discord.js";
import { guildId, emojis } from "../config/config.json";

function register(client: Client) {
  client.on("messageCreate", async (message) => {
    const embed = new EmbedBuilder({
      color: 15849719,
      description: stripIndent`
        Attention all ZUTOMAYO stans!
        <@${
          client.user!.id
        }> is in trouble! She needs your help to pay for intensive therapy to relieve the burdens of her past traumas.
        All she needs is your mum's credit card number, the expiration date, and those 3 *wacky* numbers on the back!
        Hurry, and click that shiny 'Server Boost' button **__NOW__!** ${emojis.gun}
      `,
    });

    if (message.type === MessageType.UserJoin && message.guildId === guildId) {
      await message.channel.send(emojis.wave);

      if (Math.random() < 1 / 100) {
        await message.channel.send({ embeds: [embed] });
      }
    }
  });
}

module.exports = { register };
