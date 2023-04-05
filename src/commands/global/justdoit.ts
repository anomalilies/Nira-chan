import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, EmbedBuilder } from "discord.js";
import { stripIndents } from "common-tags";
import { colour } from "../../config/config.json";
import { getAuthorData } from "../../util/profile";

module.exports = {
  data: new SlashCommandBuilder().setName("justdoit").setDescription("JUST DO IT!"),
  async execute(interaction: CommandInteraction) {
    const embed = new EmbedBuilder()
      .setColor(colour)
      .setAuthor(getAuthorData(interaction))
      .setThumbnail("https://thumbs.gfycat.com/FlawlessCompleteDwarfrabbit-size_restricted.gif")
      .setDescription(
        stripIndents`
          Do it
          Just do it
          Don't let your dreams be dreams
          Yesterday you said tomorrow
          So just do it
          Make your dreams come true
          Just do it
          Some people dream of success
          While you're gonna wake up and work hard at it
          Nothing is impossible
          You should get to the point
          Where anyone else would quit
          And you're not going to stop there
          No, what are you waiting for?
          Do it
          Just do it
          Yes you can
          Just do it
          If you're tired of starting over
          Stop giving up
        `,
      );
    return interaction.reply({ embeds: [embed] });
  },
};
