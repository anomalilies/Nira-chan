import { MessageEmbed } from 'discord.js';

import rules from '../../embeds/ruleEmbeds.json';
import { homeGuild, roles } from '../../config/config.json';
import { serverRulesMessage } from '../../config/event_handler.json';
import { keyv } from '../../database/keyv';
import { CommandoMessage } from 'discord.js-commando';

export const handleServerRulesMessage = async (message: CommandoMessage, prefix: string) => {
  if ((await keyv.get(Object.keys({ serverRulesMessage })[0])) === false) {
    return;
  }

  if (message.guild.id === homeGuild) {
    if (message.member && message.member.roles.cache.get(roles.VIP)) {
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
        await message.say(embed);
      }
    }
  }
};
