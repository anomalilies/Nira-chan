const Discord = require("discord.js");
var uwuifying = require("../../UWU Translator/uwuify");
var data = require("../../UWU Translator/data");

module.exports = {
    commands: "uwu",
    callback: (message) => {
        var args = message.content.slice(4).trim().split(/ +/g);
        var command = args.shift();
        var str = command + " " + args.join(" ");

        if (message.guild.id === "441673705458761729") {
            if (message.channel.id === "696143475954941962") {
                var str = message.content
                uwuifying.custom(str, message, data, Discord);
            }
            else if (message.channel.id === "456367532434128897" && 
            message.author.id === "238386015520292866") {
                message.react("771179684851089458");
            }
        }
        else {
            message.react("771179684851089458");
            uwuifying.custom(str, message, data, Discord);
        }
    }
}