import { Message, MessageEmbed } from 'discord.js';

import { members, prefix } from '../../config/config.json';

export const handleQueenCommandMessage = async (message: Message) => {
  if (message.content.toLowerCase() === prefix + 'wk zutomayo') {
    const embed = new MessageEmbed()
      .setColor(15849719)
      .setTitle('Did you know?')
      .setDescription(`In reality, <@${members.currentowner}> has the crown. <:queen:762902044683403272>`);

    return await message.channel.send(embed);
  }
};
