import { EmbedBuilder } from "@discordjs/builders";
import { Client, Collection, GuildTextBasedChannel, Message, MessageReaction, User } from "discord.js";
import { channels, emojis, colour } from "../config/config.json";
import { Picker, rolePickerData } from "../embeds/rolepicker";

function register(client: Client) {
  if (process.env.NODE_ENV !== "production") {
    return;
  }

  client.once("ready", async () => {
    const channel = await client.channels.fetch(channels.rolePicker);
    if (!channel || !channel.isTextBased() || channel.isDMBased()) {
      console.error("Couldn't find rolepicker channel with ID", channels.rolePicker);
      return;
    }

    const fetchMessages = async () => {
      return (await channel.messages.fetch()).filter((msg) => msg.author == client.user);
    };
    let messages = await fetchMessages();

    // create embed messages if they don't exist
    if (!messages.size) {
      await sendEmbeds(channel);
      messages = await fetchMessages();
    }

    await registerCollectors(messages);
  });
}

async function sendEmbeds(channel: GuildTextBasedChannel) {
  // build embeds from role picker data
  const embeds = rolePickerData.map((picker) => {
    const key = Array.from(picker.roles).map(([emoji, roleId]) => {
      const role = channel.guild.roles.cache.get(roleId);
      if (!role) throw new Error(`rolepicker: role ${roleId} not found`);
      return `${emoji}: \`${role.name}\``;
    });
    return new EmbedBuilder()
      .setTitle(picker.title)
      .setDescription(picker.description)
      .setColor(colour)
      .setFields([{ name: "Key", value: key.join("\n") }]);
  });

  // send messages and add reactions, with spacers between each embed
  for (let i = 0; i < embeds.length; i++) {
    const message = await channel.send({ embeds: [embeds[i]] });

    // Add reactions to the message
    const picker = rolePickerData[i];
    for (const [emoji] of picker.roles) {
      await message.react(emoji);
    }

    // Send spacer if not the last embed
    if (i < embeds.length - 1) {
      await channel.send(emojis.spacer);
    }
  }
}

async function registerCollectors(messages: Collection<string, Message<true>>) {
  messages.forEach((message) => {
    // match message with role picker data
    const embedTitle = message.embeds[0]?.title;
    const picker = rolePickerData.find((picker) => picker.title === embedTitle);
    if (!picker) return;

    // listen for user reactions
    const collector = message.createReactionCollector({ filter: (_reaction, user) => !user.bot, dispose: true });
    collector.on("collect", (reaction, user) => handleReaction(reaction, picker, user, true));
    collector.on("remove", (reaction, user) => handleReaction(reaction, picker, user, false));
  });
}

async function handleReaction(reaction: MessageReaction, picker: Picker, user: User, added: boolean) {
  // the emoji ID if it is a guild emoji, or the unicode representation otherwise
  const emoji = reaction.emoji.id || reaction.emoji.toString();

  // get roleId corresponding to reaction
  const roleId = picker.roles.get(emoji);
  if (!roleId) {
    console.error(`rolepicker: role for emoji ${reaction.emoji} not found`);
    return;
  }

  // add or remove role
  const member = await reaction.message.guild!.members.fetch(user.id);
  added ? member.roles.add(roleId) : member.roles.remove(roleId);
}

module.exports = { register };
