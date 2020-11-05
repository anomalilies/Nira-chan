const { emojis } = require("../../config.json");

module.exports = {
    commands: "dearmrf",
    callback: (message) => {
        message.channel.send(`Mr. F, I have no idea what **${message.author.username}** is saying, but something `
        + `tells me you best pay really close attention! ${emojis.wince}`);
    },
}