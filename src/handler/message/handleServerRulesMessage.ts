import { Message, MessageEmbed } from 'discord.js';

import { homeguild, roles } from '../../config/config.json';
import rules from '../../embeds/ruleEmbeds.json';

export const handleServerRulesMessage = async (message: Message, prefix: string) => {
  if (message.guild.id === homeguild) {
    if (message.member && message.member.roles.cache.get(roles.moderators)) {
      const ruleEmbeds = rules
        .filter((_, i) => {
          const regex = new RegExp(`(\\s|^)${prefix}${i + 1}(\\s|$)`);
          return regex.test(message.content);
        })
        .map((rule) =>
          new MessageEmbed().setColor(15849719).setTitle(rule.title).setDescription(rule.description).addFields({
            name: 'Moderation',
            value: rule.moderation,
          }),
        );

      for (const embed of ruleEmbeds) {
        await message.channel.send(embed);
      }
    }
  }
};
