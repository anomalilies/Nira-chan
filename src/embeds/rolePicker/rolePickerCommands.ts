import { GuildMember, MessageReaction, TextChannel, User } from 'discord.js';
import { CommandoClient } from 'discord.js-commando';

import { emojis, themeChannels } from '../../config/config.json';
import { colours, dividers, miscellaneous, pronouns } from './rolePickerEmbeds';

/**
 * Map<ReactionID, RoleID>
 */
type Picker = {
  roles: Map<string, string>;
  hasPermission(user: GuildMember, role: string): boolean;
};

type RolePickerData = {
  colours: Picker;
  dividers: Picker;
  misc: Picker;
  pronouns: Picker;
};

const data: RolePickerData = {
  colours: {
    roles: new Map<string, string>([
      ['781294389241970688', '745380089457410192'],
      ['781295090617811004', '760695283871907841'],
      ['781295102046765066', '760695285000831017'],
      ['783501246954340382', '760695501447889016'],
      ['781295124280901643', '760695751499579504'],
      ['781295137635958804', '752308894474174515'],
    ]),
    hasPermission: (user) => user.roles.cache.find((r) => r.name === 'Rainbow Pass') != undefined,
  },
  dividers: {
    roles: new Map<string, string>([
      ['764025729696268319', '770127096194269225'],
      ['756742977971552286', '770119715808477244'],
      ['764027219323912202', '770310986275618827'],
      ['764248315553775656', '770310988938346526'],
      ['764026501066129408', '781322220382453780'],
      ['777269746722668565', '781322360967266344'],
    ]),
    hasPermission: hasDividerPermission,
  },
  misc: {
    roles: new Map<string, string>([
      ['742096993731477505', '772657659635171348'],
      ['742096470462824468', '758482374232506397'],
      ['742090483446317107', '753248752332046467'],
    ]),
    hasPermission: () => true,
  },
  pronouns: {
    roles: new Map<string, string>([
      ['755500124091973703', '742068285553770529'],
      ['742130938468630659', '742068282777141369'],
      ['750462152199897208', '742068286719524865'],
      ['742104449660747908', '772539432515534890'],
    ]),
    hasPermission: () => true,
  },
};

function hasDividerPermission(user: GuildMember, role: string): boolean {
  return user.guild.roles.cache
    .sorted((a, b) => a.comparePositionTo(b))
    .keyArray()
    .some((guildRole) => {
      let doesRoleMatch = false;
      if (Array.from(data.dividers.roles.values()).includes(guildRole)) {
        doesRoleMatch = guildRole === role;
      }

      return doesRoleMatch && user.roles.cache.has(guildRole);
    });
}

function handleReaction(reaction: MessageReaction, picker: Picker, user: User, added: boolean) {
  const role = picker.roles.get(reaction.emoji.id);
  const member = reaction.message.guild.members.cache.get(user.id);

  if (!user.bot) {
    if (picker.hasPermission(member, role)) {
      added ? member.roles.add(role) : member.roles.remove(role);
    } else {
      reaction.users.remove(user);
    }
  }
}

export const rolePickerCommands = async (client: CommandoClient) => {
  const channel = <TextChannel>await client.channels.fetch(themeChannels.rolePicker);

  const messages = await channel.messages.fetch();
  const niraMessages = messages.filter((msg) => msg.author == client.user);

  if (niraMessages.size === 0) {
    await channel.send(pronouns);
    await channel.send(emojis.spacer);
    await channel.send(miscellaneous);
    await channel.send(emojis.spacer);
    await channel.send(dividers);
    await channel.send(emojis.spacer);
    await channel.send(colours);
    return;
  }

  const embedMessages = niraMessages.filter((msg) => !msg.content.startsWith(emojis.spacer)).array();

  let index = 0;
  for (const [, value] of Object.entries(data)) {
    const message = embedMessages[index];

    for (const reaction in value.roles) {
      message.react(reaction);
    }

    const collector = message.createReactionCollector(
      (reaction: MessageReaction) => value.roles.has(reaction.emoji.id),
      { dispose: true },
    );

    collector.on('collect', (reaction, user) => handleReaction(reaction, value, user, true));
    collector.on('remove', (reaction, user) => handleReaction(reaction, value, user, false));

    index++;
  }
};
