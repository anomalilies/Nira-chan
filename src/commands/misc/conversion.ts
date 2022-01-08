/* eslint-disable @typescript-eslint/no-explicit-any */
import { MessageEmbed } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import axios from 'axios';

import currencies from '../../data/currencies.json';
import { colour } from '../../config/config.json';
import { createDefaultEmbed } from '../../util/createDefaultEmbed';

interface PromptArgs {
  amount: number;
  fromCurrency: string;
  toCurrency: string;
}

export default class ConversionCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'convert',
      aliases: ['conversion', 'c'],
      group: 'misc',
      memberName: 'convert',
      description: `...`,
      args: [
        {
          key: 'amount',
          prompt: "Input the amount of your original currency you'd like to convert.",
          type: 'float',
        },
        {
          key: 'fromCurrency',
          prompt: "Input the original currency's 3-character currency code (eg: GBP).",
          type: 'string',
          oneOf: currencies,
        },
        {
          key: 'toCurrency',
          prompt: "Input the original currency's 3-character currency code (eg: GBP).",
          type: 'string',
          oneOf: currencies,
        },
      ],
    });
  }

  async run(message: CommandoMessage, { amount, fromCurrency, toCurrency }: PromptArgs) {
    const query = fromCurrency + '_' + toCurrency;

    if (toCurrency !== fromCurrency) {
      axios
        .get(`https://free.currconv.com/api/v7/convert?q=${query}&compact=ultra&apiKey=${process.env.CONVERSION_KEY}`)
        .catch(function (error) {
          if (error.response) {
            return message.channel.send(createDefaultEmbed('API Error', error.toString(), colour, message.author));
          } else {
            async (res: any) => {
              const val = <any>Object.values(res.data);
              const conversion = (val * amount).toFixed(2);

              const embed = new MessageEmbed({
                author: { name: `💰 ${amount} ${fromCurrency.toUpperCase()} equals:` },
                title: `${conversion} ${toCurrency.toUpperCase()}`,
                footer: {
                  text: message.author.tag,
                  iconURL: message.author.displayAvatarURL({ dynamic: true }),
                },
                color: colour,
                timestamp: Date.now(),
              });

              return message.channel.send(embed);
            };
          }
        });
    } else {
      return message.channel.send(
        createDefaultEmbed('Why even bother?', "You can't convert from the same currency!", colour, message.author),
      );
    }
  }
}
