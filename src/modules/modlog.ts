import { Client, GuildMember, PartialGuildMember } from "discord.js";
import { channels, emojis, guildId } from "../config/config.json";

function register(client: Client) {
  if (process.env.NODE_ENV !== "production") {
    return;
  }

  client.on(
    "guildMemberAdd",
    createModlogListener((username) => `**${username}** joined! ${emojis.hello}`),
  );
  client.on(
    "guildMemberRemove",
    createModlogListener((username) => `**${username}** left... ${emojis.wail}`),
  );
}

function createModlogListener(messageTemplate: (username: string) => string) {
  return async function (member: GuildMember | PartialGuildMember) {
    const modlog = await member.client.channels.fetch(channels.modlog);

    if (!modlog || !modlog.isTextBased()) {
      console.error("Couldn't find modlog channel with ID", channels.modlog);
      return;
    }

    if (member.guild.id === guildId) {
      await modlog.send(messageTemplate(member.user.username));
    }
  };
}

module.exports = { register };
