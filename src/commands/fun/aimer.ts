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
      const embed = new MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        .setColor(0xf1d8f7);

      if (name.toLowerCase() === 'aimer') {
        embed.setDescription(oneLine`
          Pretend that you're surprised. Yes, I love Aimer. Yes, my love for Aimer is borderline obsessive. 
          It's actually quite hard to put into words just how much does she mean to me. Her music is not just 
          music. Her songs are not just songs. Her voice is not just a voice. They are special. She's my 
          escapism, my drug, my sedative. Listening to her is one of the few ways I can relax and calm down. 
          She never failed to calm me down. Whenever I listen to her I feel bewitched, taken, enchanted. When 
          I listen to her, nothing matters. I cried when I watched her Budokan live. She's just so gorgeous 
          and cute and amazing and happy there, I just couldn't help but cry. I listen to her daily, I feel 
          really uncomfortable if I haven't heard anything Aimer for a day. I'm addicted, and I love it. Yes 
          I'm aware that this part makes no coherent sense, I don't care, just bear with me. There is no 
          doubt in my mind that I am her biggest fan. Doesn't matter if someone has listened to her more than 
          I did, or if someone knows all her lyrics word by word. I just simply know that no one feels the 
          way I do. There is a person that understands me and supports me, and I'm happy that this person 
          also likes Aimer. I am the biggest fan of Aimer because she has become the part of my life.
        `);
      } else {
        embed.setDescription(oneLine`
          Pretend that you're surprised. Yes, I love ${name}. Yes, my love for ${name} is borderline 
          obsessive. It's actually quite hard to put into words just how much ${name} means to me. ${name}'s 
          music is not just music. ${name}'s songs are not just songs. ${name}'s voice is not just a voice. 
          ${name} is special. ${name}'s my escapism, my drug, my sedative. Listening to ${name} is one of the 
          few ways I can relax and calm down. ${name}'s never failed to calm me down. Whenever I listen to 
          ${name} I feel bewitched, taken, enchanted. When I listen to ${name}, nothing else matters. I cried 
          when I watched ${name} live. ${name} is just so amazing, I couldn't help but cry. I listen to 
          ${name} daily, and feel really uncomfortable if I haven't heard anything ${name} for a day. I'm 
          addicted, and I love it. Yes, I'm aware that I am making no coherent sense; I don't care, just bear 
          with me. There is no doubt in my mind that I am ${name}'s biggest fan. It doesn't matter if someone 
          has listened to ${name} more than I have, or if someone knows all of ${name}'s lyrics word-by-word. 
          I just simply know that no one feels the way I do. There is a person that understands me and 
          supports me, and I'm happy that this person also likes ${name}. I am the biggest fan of ${name} 
          because ${name} has become part of my life.
        `);
      }

      return await message.say(embed);
    }
  }
}
