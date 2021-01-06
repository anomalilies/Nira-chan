const Commando = require("discord.js-commando");
const configFileName = process.env.NIRA_DEV ? 'config.dev.json' : 'config.json';
const { homeguild, allowlists, zoneRoles } = require(`../../${configFileName}`);
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
        if (message.channel.type === "dm" || allowlists.botspamchannels.includes(message.channel.id) || message.guild.id !== homeguild || message.member.roles.cache.get(zoneRoles.botPass)) {
            var abilityGroup = [];
            var weights = [];

            for (var key in abilities) {
                abilityGroup.push(abilities[key].ability);
                weights.push(abilities[key].weight);
            }
            var i, nickname = "";
            for (i = 0; i < weights.length; i++) {
                weights[i] += weights[i - 1] || 0;
            }
            var random = Math.random() * weights[weights.length - 1];
            console.log(random)
            for (i = 0; i < weights.length; i++) {
                if (weights[i] > random) {
                    break;
                }
            }
            var ability = abilityGroup[i]
            const index = Math.floor(Math.random() * ability.length);

            if (message.channel.type === "dm") {
                var nickname = message.author.username;
            }
            else {
                let member = message.guild.member(message.author);
                var nickname = member.displayName;
            }
            const replies = [
                `Kirby inhaled **${nickname}** and got the **${ability[index]}** ability!`,
                `Somehow, when Kirby inhaled **${nickname}**, he got the **${ability[index]}** ability!`,
                `Elemental combo! Kirby got the **${ability[index]}** ability when inhaling **${nickname}**!`,
                `Power combo! Kirby got the **${ability[index]}** ability when inhaling **${nickname}**!`,
                `Woah! Kirby got the **${ability[index]}** super ability when inhaling **${nickname}**!`,
                `Kirby inhaled **${nickname}** and... Turned into yarn? He uses the **${ability[index]}** move!`,
                `Kirby found a Robobot Armour docking station! After inhaling **${nickname}**, he uses **${ability[index]}**!`,
                `With **${nickname}**, Kirby partners up with his friends! He uses the **${ability[index]}** attack!`,
                `Wow! Kirby inhaled **${nickname}** and got the rare **${ability[index]}** ability!`,
                `Kirby inhaled **${nickname}** and... Turned into yarn? He gains the **${ability[index]}** ability!`,
                `As Kirby is approaching an impending boss fight, anxiety creeps over him. No need to worry, though; Kirby inhales **${nickname}**, and gets the **${ability[index]}** ability!`,
                `No way... Kirby inhaled **${nickname}** and got the ultra-rare **${ability[index]}** ability!`
            ]

            const embed = new MessageEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic:true}))
                .setColor(15849719)
                .setDescription(`<:kirbsucc:757289104789471322> ${replies[i]}`);
            message.channel.send(embed);
        }
    }
};