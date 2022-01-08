import { MessageEmbed } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';

import { colour } from '../../config/config.json';

interface PromptArgs {
  temperature: number;
  scale: string;
}

const celsius = ['celsius', 'c', '°c'];
const fahrenheit = ['fahrenheit', 'f', '°f'];

export default class TemperatureCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'temperature',
      aliases: ['t'],
      group: 'misc',
      memberName: 'temperature',
      description: `Convert Celsius to Fahrenheit, and vice-versa.`,
      args: [
        {
          key: 'temperature',
          prompt: "What is the value of the temperature you'd like to convert from?",
          type: 'float',
        },
        {
          key: 'scale',
          prompt: "What is the scale of the temperature you'd like to convert from?",
          type: 'string',
          oneOf: celsius.concat(fahrenheit),
        },
      ],
    });
  }

  async run(message: CommandoMessage, { temperature, scale }: PromptArgs) {
    let response: string;
    let fromScale: string;
    let toScale: string;

    if (celsius.includes(scale.toLowerCase())) {
      fromScale = 'C';
      toScale = 'F';
      response = `${(temperature * (9 / 5) + 32).toFixed(1)}°${toScale}`;
    } else {
      fromScale = 'F';
      toScale = 'C';
      response = `${(((temperature - 32) * 5) / 9).toFixed(1)}°${toScale}`;
    }

    const embed = new MessageEmbed({
      author: { name: `🌡️ ${temperature}°${fromScale} equals:` },
      title: response,
      footer: {
        text: message.author.tag,
        iconURL: message.author.displayAvatarURL({ dynamic: true }),
      },
      color: colour,
      timestamp: Date.now(),
    });
    return await message.channel.send(embed);
  }
}
