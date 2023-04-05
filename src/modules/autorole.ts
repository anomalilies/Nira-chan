import { Client, GuildMember } from "discord.js";
import { guildId, roles } from "../config/config.json";

const newbiesPeriod = 259200000; // 3 days
const roleCheckInterval = 60000; // 1 hour

function register(client: Client) {
  if (process.env.NODE_ENV !== "production") {
    return;
  }

  // update on member join
  client.on("guildMemberAdd", updateMemberRoles);

  // or on screening complete if rules screening is enabled
  client.on("guildMemberUpdate", (oldMember, newMember) => {
    if (oldMember.pending && !newMember.pending) {
      updateMemberRoles(newMember);
    }
  });

  // check all members every hour
  client.once("ready", () => {
    let running = false;
    setInterval(async () => {
      if (!running) {
        running = true;
        await checkMembers(client).catch(console.error);
        running = false;
      }
    }, roleCheckInterval);
  });
}

// call updateMemberRoles on all members of main guild
async function checkMembers(client: Client) {
  const guild = client.guilds.cache.get(guildId);
  if (!guild) {
    console.error("autorole: guild not available");
    return;
  }

  const members = await guild.members.fetch();
  for (const member of members.values()) {
    await updateMemberRoles(member);
  }
}

async function updateMemberRoles(member: GuildMember) {
  if (member.guild.id === guildId && !member.pending && !member.user.bot) {
    // add VIP
    if (!member.roles.cache.has(roles.VIP)) {
      await member.roles.add(roles.VIP);
    }

    // add or remove Newbies
    if (member.joinedTimestamp) {
      const memberTime = Date.now() - member.joinedTimestamp;
      if (!member.roles.cache.has(roles.newbies) && memberTime < newbiesPeriod) {
        await member.roles.add(roles.newbies);
      }
      if (member.roles.cache.has(roles.newbies) && memberTime >= newbiesPeriod) {
        await member.roles.remove(roles.newbies);
      }
    }
  }
}

module.exports = { register };
