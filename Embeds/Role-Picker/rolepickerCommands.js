const { emojis } = require("../../config.json");

module.exports = async (client, id = []) => {
    const channel = await client.channels.fetch(id);
  
    channel.messages.fetch().then((messages) => {
        const niraMessages = messages.filter(msg => msg.author == client.user);

        const reactions = {           
            coloursReact: ["🦑"], // ["781294389241970688", "781295090617811004", "781295102046765066", "783501246954340382", "781295124280901643", "781295137635958804"]
            dividersReact: ["764025729696268319", "756742977971552286", "764027219323912202", "764248315553775656", "764026501066129408", "777269746722668565"],
            miscReact: ["742096993731477505", "742096470462824468", "742090483446317107"],
            pronounsReact: ["755500124091973703", "742130938468630659", "750462152199897208", "742104449660747908"]
        }

        const roles = {
            coloursID: ["745380089457410192", "760695283871907841", "760695285000831017", "760695501447889016", "760695751499579504", "752308894474174515"],
            dividersID: ["770127096194269225", "770119715808477244", "770310986275618827", "770310988938346526", "781322220382453780", "781322360967266344"],
            miscID: ["772657659635171348", "758482374232506397", "753248752332046467"],
            pronounsID: ["742068285553770529", "742068282777141369", "742068286719524865", "772539432515534890"]
        }

        if (niraMessages.size === 0) {
            channel.send(pronouns)
            channel.send(emojis.spacer);
            channel.send(miscellaneous);
            channel.send(emojis.spacer);
            channel.send(dividers);
            channel.send(emojis.spacer);
            channel.send(colours);
        } else {
            const embedMessages = niraMessages.filter(msg => !msg.content.startsWith(emojis.spacer));
            let arr = Object.values(reactions);
            var x;
            for (var [key] of Object.entries(arr)) {
                for (x of arr[key]) {
                    embedMessages.array()[key].react(x)
                }
            }

            /*client.on("messageReactionAdd", (reaction, user, client) => {
                if (user.bot) return;
                if (user.roles.cache.get("790791220179632128")) {
                }
            })

            client.on("messageReactionRemove", (reaction, user) => {
                if (user.bot) return;

            })*/
        }
    })
};