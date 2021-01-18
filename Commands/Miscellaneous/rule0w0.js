const Commando = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");
const configFileName = process.env.NIRA_DEV ? 'config.dev.json' : 'config.json';
const { homeguild } = require(`../../${configFileName}`);

module.exports = class Rule0w0Command extends Commando.Command {
    constructor(client) {
        super(client, {
            name: "0w0",
            group: "misc",
            memberName: "0w0",
            description: "P-Pwovide anyothew usew with some much-wewcome encouwagement! -( ﾟ▽ﾟ)/ ",
            guildOnly: true
        });    
    }

    run(message) {
        if (message.guild.id === homeguild) {
            const rule0w0 = new MessageEmbed()
            .setTitle("(Swecrwet Rwulwe) 0w0. Bwe Kwind to Youwsewf")
            .setDescription(
                "We cawe fow ywou, so stwop byeatwing youwsewf up. (・`ω´・)\nNyot evewything is youw fauwt, so "
                + "pwease keep twusting youwsewf, and ouw wespect and wuv fow you.");
            message.channel.send(rule0w0);
        }
    }
};