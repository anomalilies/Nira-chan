import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, MessageEmbed } from "discord.js";
import { colour } from "../config/config.json";
import { oneLine } from "common-tags";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("aimer")
    .setDescription("Pretend that you're surprised.")
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .addStringOption((option: any) => option.setName("input").setDescription("Who you want to obsess over.")),

  async execute(interaction: CommandInteraction) {
    const input: string = interaction.options.getString("input");

    if (!input || input.length <= 133) {
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
      const embed = new MessageEmbed().setColor(colour).setAuthor({ name: nickname, iconURL: avatar });

      if (!input || input.toLowerCase() === "aimer") {
        embed.setDescription(oneLine`Pretend that you're surprised. Yes, I love Aimer. Yes, my love for Aimer is borderline obsessive.
                  It's actually quite hard to put into words just how much does she mean to me. Her music is not just
                  music. Her songs are not just songs. Her voice is not just a voice. They are special. She's my
                  escapism, my drug, my sedative. Listening to her is one of the few ways I can relax and calm down.
                  She never failed to calm me down. Whenever I listen to her I feel bewitched, taken, enchanted. When
                  I listen to her, nothing matters. I cried when I watched her Budokan live. She's just so gorgeous
                  and cute and amazing and happy there, I just couldn't help but cry. I listen to her daily, I feel
                  really uncomfortable if I haven't heard anything Aimer for a day. I'm addicted, and I love it. Yes
                  I'm aware that this part makes no coherent sense, I don't care, just bear with me. There is no
                  doubt in my mind that I am her biggest fan. Doesn't matter if someone has listened to her more than
                  I did, or if someone knows all her lyrics word by word. I just simply know that no one feels the
                  way I do. There is a person that understands me and supports me, and I'm happy that this person
                  also likes Aimer. I am the biggest fan of Aimer because she has become the part of my life.
                `);
      } else {
        embed.setDescription(oneLine`Pretend that you're surprised. Yes, I love ${input}. Yes, my love for ${input} is borderline
                  obsessive. It's actually quite hard to put into words just how much ${input} means to me. ${input}'s
                  music is not just music. ${input}'s songs are not just songs. ${input}'s voice is not just a voice.
                  ${input} is special. ${input}'s my escapism, my drug, my sedative. Listening to ${input} is one of the
                  few ways I can relax and calm down. ${input}'s never failed to calm me down. Whenever I listen to
                  ${input} I feel bewitched, taken, enchanted. When I listen to ${input}, nothing else matters. I cried
                  when I watched ${input} live. ${input} is just so amazing, I couldn't help but cry. I listen to
                  ${input} daily, and feel really uncomfortable if I haven't heard anything ${input} for a day. I'm
                  addicted, and I love it. Yes, I'm aware that I am making no coherent sense; I don't care, just bear
                  with me. There is no doubt in my mind that I am ${input}'s biggest fan. It doesn't matter if someone
                  has listened to ${input} more than I have, or if someone knows all of ${input}'s lyrics word-by-word.
                  I just simply know that no one feels the way I do. There is a person that understands me and
                  supports me, and I'm happy that this person also likes ${input}. I am the biggest fan of ${input}
                  because ${input} has become part of my life.
                `);
      }

      return interaction.reply({ embeds: [embed] });
    } else {
      return interaction.reply({ content: "Your input is too long!", ephemeral: true });
    }
  },
};
