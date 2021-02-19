import { oneLine } from 'common-tags';
import { MessageEmbed } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';

import { doesUserHaveBotpass, isBotspamChannel, isDmChannel, isHomeGuild } from '../../util/checks';

interface PromptArgs {
  name: string;
}

export default class AimerCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'aimer',
      group: 'fun',
      memberName: 'aimer',
      description: 'AIMER ZONE.',
      args: [
        {
          key: 'name',
          prompt: 'Who would you like to admire?',
          type: 'string',
          default: 'aimer',
          validate: (name: string) => {
            if (name.length <= 40) return true;
            return 'I respect your admiration, truly, however your message is too long!';
          },
        },
      ],
    });
  }

  async run(message: CommandoMessage, { name }: PromptArgs) {
    if (isDmChannel(message) || isBotspamChannel(message) || !isHomeGuild(message) || doesUserHaveBotpass(message)) {
      let userName = name;

      if (userName.toLowerCase() === 'aimer') {
        userName = 'Aimer';
      }

      const embed = new MessageEmbed({
        color: '#F1D8F7',
        author: { name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) },
        description: oneLine`
          Pretend that you’re surprised. Yes, I love ${userName}. Yes, my love for ${userName} is borderline obsessive.
          It’s actually quite hard to put into words just how much ${userName} means to me. ${userName}'s music is not
          just music. ${userName}'s songs are not just songs. ${userName}'s voice is not just a voice. ${userName}
          is special. ${userName}'s my escapism, my drug, my sedative. Listening to ${userName} is one of the few ways
          I can relax and calm down. ${userName}'s never failed to calm me down. Whenever I listen to ${userName} I
          feel bewitched, taken, enchanted. When I listen to ${userName}, nothing else matters. I cried when I watched
          ${userName} live. ${userName} is just so amazing, I couldn’t help but cry. I listen to ${userName} daily,
          and feel really uncomfortable if I haven’t heard anything ${userName} for a day. I’m addicted, and I love it.
          Yes, I’m aware that I am making no coherent sense; I don’t care, just bear with me. There is no doubt in my
          mind that I am ${userName}'s biggest fan. It doesn't matter if someone has listened to ${userName} more than
          I have, or if someone knows all of ${userName}'s lyrics word-by-word. I just simply know that no one feels
          the way I do. There is a person that understands me and supports me, and I’m happy that this person also
          likes ${userName}. I am the biggest fan of ${userName}because ${userName} has become part of my life.
        `,
      });

      return await message.channel.send(embed);
    }
  }
}
