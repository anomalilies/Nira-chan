const { emojis } = require("../../config.json");

module.exports = {
    commands: ["stabstabstab", "stab", "fence", "fencing"],
    callback: (message) => {
        message.channel.send(`pokepokepoke ${emojis.fencing}`);
    },
}