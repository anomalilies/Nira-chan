import { Message, MessageEmbed } from 'discord.js';

const winemoji = '802352890571653170';
const paladinResponses = ['decant', 'grand paladin', `<:1945grandpaladin:${winemoji}>`];

export const handlePaladinMessage = async (message: Message) => {
  const isPaladin = paladinResponses.some((word) => message.content.toLowerCase().includes(word.toLowerCase()));

  if (!isPaladin) {
    return;
  }

  if (message.content === 'Decant.') {
    await message.react('🇩');
    await message.react('🇪');
    await message.react('🇨');
    await message.react('🇦');
    await message.react('🇳');
    await message.react('🇹');
    return;
  }

  if (Math.random() < 1 / 10) {
    const embed = new MessageEmbed()
      .setDescription(
        "It is perfection. Irreplaceable. You don't drink the **1945 Grand Paladin** anymore than you'd write a shopping list on the Mona Lisa!",
      )
      .setColor(15849719);
    message.channel.send(embed);
  }

  message.react(winemoji);
};
