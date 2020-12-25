const { emojis } = require("../../config.json");

module.exports = async (client, id = []) => {
    const channel = await client.channels.fetch(id);
  
    channel.messages.fetch().then((messages) => {
        const niraMessages = messages.filter(msg => msg.author == client.user);

        const reactions = {
            pronounsReact: {
                emojiID: ["755500124091973703", "742130938468630659", "750462152199897208", "742104449660747908"],
                roleID: ["742068285553770529", "742068282777141369", "742068286719524865", "772539432515534890"]
            },
            miscReact: {
                emojiId: ["742096993731477505", "742096470462824468", "742090483446317107"],
                roleID: ["772657659635171348", "758482374232506397", "753248752332046467"]          
            },
            dividersReact: {
                emojiID: ["764025729696268319", "756742977971552286", "764027219323912202", "764248315553775656", "764026501066129408", "777269746722668565"]/*,
                roleID: ["770127096194269225", "770119715808477244", "770310986275618827", "770310988938346526", "781322220382453780", "781322360967266344"]*/
            } ,
            coloursReact: {
                emojiID: ["781294389241970688", "781295090617811004", "781295102046765066", "783501246954340382", "781295124280901643", "781295137635958804"],
                roleID: ["745380089457410192", "760695283871907841", "760695285000831017", "760695501447889016", "760695751499579504", "752308894474174515"]
            }
        }
        const menus = {
            pronounMenu: [niraMessages.array()[6]],
            miscMenu: [niraMessages.array()[4]],
            dividersReact: [niraMessages.array()[2]],
            coloursReact: [niraMessages.array()[0]]
        }

        if (niraMessages.size === 0) {
            channel.send(pronouns)
            channel.send(emojis.spacer);
            channel.send(miscellaneous);
            channel.send(emojis.spacer);
            channel.send(dividers);
            channel.send(emojis.spacer);
            channel.send(colours);
        }
        else {
            function roleMenu (reactName, menuName) { // i made this a function bc it works, but i'd rather not repeat the same code endlessly
                reactName.emojiID.reduce((promise, emoji) => promise.then(() => menuName.react(emoji)), Promise.resolve());
            }
            for (var i = 0; i < niraMessages; i+2) {
                var reactName = reactions.miscReact;  // these 2 should be automated;
                var menuName = menus.miscMenu;        // i.e.: reactions and menus should run for *misc* react and menu (and the others) without input
                roleMenu(reactName, menuName);
            }
        }
    });
};