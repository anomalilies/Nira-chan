require("dotenv").config();
const Commando = require("discord.js-commando");
const configFileName = process.env.NIRA_DEV ? 'config.dev.json' : 'config.json';
const { homeguild, allowlists } = require(`../../${configFileName}`);
const { MessageEmbed } = require("discord.js");
const abilities = require("../../Data/copyabilities.json");

module.exports = class KirbyCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: "kirby",
            aliases: ["copyability"],
            group: "fun",
            memberName: "kirby",
            description: "What ability would Kirby get if he inhaled you?",
        });
    }

    async run(message) {
        if (message.channel.type === "dm" || allowlists.botspamchannels.includes(message.channel.id) || message.guild.id !== homeguild || message.member.roles.cache.get("752308894474174515")) {
            for(var key in abilities){
                var abilityGroup = abilities[key]
            }
            var weights = [45, 20, 10, 5, 4, 4, 3, 3, 2, 2, 1, 1]

            var total = 0;
            for(var i = 0, len = weights.length; i < len; i++) {
                weights[i] = [total, total += weights[i]];
            }
            var randomNumber = parseInt(Math.random() * total);
            for(;randomNumber < weights[--i][0];) {
                var ability = abilityGroup[i];
            }
            const index = Math.floor(Math.random() * ability.length);

            const embed = new MessageEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic:true}))
                .setColor(15849719);
            if (message.channel.type === "dm") {
                embed.setDescription(`<:kirbsucc:757289104789471322> Kirby inhaled **${message.author.username}** and got the **${ability[index]}** ability!`);
            } else {
                let member = message.guild.member(message.author);
                embed.setDescription(`<:kirbsucc:757289104789471322> Kirby inhaled **${member.displayName}** and got the **${ability[index]}** ability!`);
            }
            message.channel.send(embed);
        }
    }
};