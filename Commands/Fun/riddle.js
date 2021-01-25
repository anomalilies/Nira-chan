const Commando = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");
const riddlesList = require("../../Data/riddles.json");

module.exports = class RiddleCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: "riddle",
            group: "fun",
            memberName: "riddle",
            description: "Just really awful riddles."
        });
    }

    async run(message) {
        if (message.channel.type === "dm" || allowlists.botspamchannels.includes(message.channel.id) || message.channel.type === "dm" || message.member.roles.cache.get(zoneRoles.botPass)) {
            var riddles = [];
            var answers = [];
            
            for (var key in riddlesList) {
                riddles.push(riddlesList[key].riddle);
                answers.push(riddlesList[key].answer);
            }
            console.log(answers)
            const i = Math.floor(Math.random() * riddles.length);

            const embed = new MessageEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic:true}))
                .setColor(15849719)
                .setDescription(riddles[i])
                .addField("Answer", `||${answers[i]}||`);
            message.channel.send(embed);
        }
    }
};