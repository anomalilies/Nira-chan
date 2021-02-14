import { MessageEmbed } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';

import { allowlists, zoneRoles } from '../../config/config.json';
import riddlesList from '../../../Data/riddles.json';

export default class RiddleCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'riddle',
      group: 'fun',
      memberName: 'riddle',
      description: 'Just really awful riddles.',
    });
  }

  async run(message: CommandoMessage) {
    if (
      message.channel.type === 'dm' ||
      allowlists.botspamchannels.includes(message.channel.id) ||
      message.member.roles.cache.get(zoneRoles.botPass)
    ) {
      const riddles = [];
      const answers = [];

      for (const key in riddlesList) {
        riddles.push(riddlesList[key].riddle);
        answers.push(riddlesList[key].answer);
      }

      const i = Math.floor(Math.random() * riddles.length);

      const embed = new MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        .setColor(15849719)
        .setDescription(riddles[i])
        .addField('Answer', `||${answers[i]}||`);

      return await message.channel.send(embed);
    }
  }
}
