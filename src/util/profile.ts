import { CommandInteraction, EmbedAuthorData, EmbedFooterData } from "discord.js";

export function getAuthorData(interaction: CommandInteraction): EmbedAuthorData {
  if (interaction.inCachedGuild()) {
    return {
      name: interaction.member.displayName,
      iconURL: interaction.member.displayAvatarURL(),
    };
  } else {
    return {
      name: interaction.user.username,
      iconURL: interaction.user.displayAvatarURL(),
    };
  }
}

export function getFooterData(interaction: CommandInteraction): EmbedFooterData {
  const { name, iconURL } = getAuthorData(interaction);
  return { text: name, iconURL };
}
