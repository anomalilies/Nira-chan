import { MessageEmbed } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';

import { colour } from '../../config/config.json';

const inch = ['inch', 'inches', 'in', 'ins'];
const cm = ['centimetre', 'centimetres', 'cm', 'cms'];

export default class MeasureCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'measure',
      aliases: ['m', 'measurement'],
      group: 'misc',
      memberName: 'measure',
      description: `Convert inches to centimetres, and vice-versa.`,
      args: [
        {
          key: 'measurement',
          prompt: "What is the the measurement you'd like to convert from?",
          type: 'string',
        },
      ],
    });
  }

  async run(message: CommandoMessage, measurement: string) {
    let response: string;
    let fromScale: string;
    let toScale: string;

    // eslint-disable-next-line no-useless-escape
    const arg = Object.values(measurement)[0].match(/[\d\.]+|\S\D+/g);
    const num = parseFloat(arg[0]);
    const str = arg[1];

    if (inch.includes(str.toLowerCase())) {
      fromScale = 'in';
      toScale = 'cm';
      response = (num * 2.54).toFixed(1) + toScale;
    } else if (cm.includes(str.toLowerCase())) {
      fromScale = 'cm';
      toScale = 'in';
      response = (num / 2.54).toFixed(1) + toScale;
    } else {
      message.channel.send('Syntax error!');
    }

    const embed = new MessageEmbed({
      author: { name: `📏 ${num}${fromScale} equals:` },
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
