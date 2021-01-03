require("dotenv").config();
const configFileName = process.env.NIRA_DEV ? 'config.dev.json' : 'config.json';
const { emojis } = require(`../../${configFileName}`);

module.exports = async (client, id = []) => {
    const channel = await client.channels.fetch(id);
  
    channel.messages.fetch().then((messages) => {
        const niraMessages = messages.filter(msg => msg.author == client.user);

        if (niraMessages.size === 0) {
            channel.send("**Please keep bot commands strictly to channels in the Bots category only** - Thank you!");
            channel.send(emojis.spacer);
            channel.send("**`!` Prefix**\nThe following commands use `!` as a prefix.");
            channel.send(bc1);
            channel.send(emojis.spacer);
            channel.send(bc2);
            channel.send(emojis.spacer);
            channel.send(bc3);
            channel.send(emojis.spacer);
            channel.send("**`-` Prefix**\nThe following commands use `-` as a prefix.");
            channel.send(bc4);
            channel.send(emojis.spacer);
            channel.send(bc5);
            channel.send(bc6);
            channel.send(emojis.spacer);
            channel.send(bc7);
            channel.send(emojis.spacer);
            channel.send(bc8);
            channel.send(emojis.spacer);
            channel.send(bc9);
            channel.send(emojis.spacer);
            channel.send("`@` **Prefix**");
            channel.send(bc10);
        }
        else {
            niraMessages.array()[19].edit(bc1);
            niraMessages.array()[17].edit(bc2);
            niraMessages.array()[15].edit(bc3);
            niraMessages.array()[12].edit(bc4);
            niraMessages.array()[10].edit(bc5);
            niraMessages.array()[9].edit(bc6);
            niraMessages.array()[7].edit(bc7);
            niraMessages.array()[5].edit(bc8);
            niraMessages.array()[3].edit(bc9);
            niraMessages.array()[0].edit(bc10);
        }
    });
};