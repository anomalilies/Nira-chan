const Commando = require("discord.js-commando");
const { allowlists, homeguild } = require("../../config.json");
const { MessageEmbed } = require("discord.js");

module.exports = class AddCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: "aimer",
            group: "fun",
            memberName: "aimer",
            description: "AIMER ZONE.",
            args: [
                {
                    key: "name",
                    prompt: "Who would you like to admire?",
                    type: "string"
                }
            ]
        });
    }

    async run(message, {name}) {
        if (message.channel.type === "dm" || allowlists.botspamchannels.includes(message.channel.id) || message.guild.id !== homeguild) {
            if (name.length <= 40) {
                const embed = new MessageEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic:true}))
                .setDescription(
                    `Pretend that you’re surprised. Yes, I love ${name}. Yes, my love for ${name} is borderline obsessive. It’s actually quite hard to put into words just how much ${name} means to me. ${name}'s music is not just music. ${name}'s songs are not just songs. ${name}'s voice is not just a voice. ${name} is special. ${name}'s my escapism, my drug, my sedative. Listening to ${name} is one of the few ways I can relax and calm down. ${name}'s never failed to calm me down. Whenever I listen to ${name} I feel bewitched, taken, enchanted. When I listen to ${name}, nothing else matters. I cried when I watched ${name} live. ${name} is just so amazing, I couldn’t help but cry. I listen to ${name} daily, and feel really uncomfortable if I haven’t heard anything ${name} for a day. I’m addicted, and I love it. Yes, I’m aware that I am making no coherent sense; I don’t care, just bear with me. There is no doubt in my mind that I am ${name}'s biggest fan. It doesn't matter if someone has listened to ${name} more than I have, or if someone knows all of ${name}'s lyrics word-by-word. I just simply know that no one feels the way I do. There is a person that understands me and supports me, and I’m happy that this person also likes ${name}. I am the biggest fan of ${name} because ${name} has become part of my life.`
                )
                .setColor(15849719);
                message.channel.send(embed);
            }
            else {
                message.channel.send("I respect your admiration, truly, however your message is too long!");
            }
        }
    }
};