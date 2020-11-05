const { emojis } = require("../../config.json");

module.exports = {
    commands: "despair",
    callback: (message) => {
        message.channel.send(`Aaaa, the tape is rewinding so fast! ${emojis.despair}`);
    },
}