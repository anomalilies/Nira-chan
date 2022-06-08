import { CommandInteraction } from "discord.js";

export const nicknameCheck = (interaction: CommandInteraction) => {
  let a: string;
  let n: string;
  if (interaction.inGuild()) {
    const userId = interaction.guild!.members.cache.find((user) => user.id === interaction.user.id)!;
    a = userId.displayAvatarURL({ dynamic: true });
    n = userId.displayName;
  } else {
    a = interaction.user.avatarURL({ dynamic: true })!;
    n = interaction.user.username;
  }
  return { avatar: a, nickname: n };
};
