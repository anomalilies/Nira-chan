const { emojis } = require("../../config.json");

module.exports = async (client, id = []) => {
    const channel = await client.channels.fetch(id);
  
    channel.messages.fetch().then((messages) => {
        const niraMessages = messages.filter(msg => msg.author == client.user);

        const data = {
            colours: {
                roles: {
                    // "reaction id": "role id"
                    "781294389241970688": "745380089457410192",
                    "781295090617811004": "760695283871907841",
                    "781295102046765066": "760695285000831017",
                    "783501246954340382": "760695501447889016",
                    "781295124280901643": "760695751499579504",
                    "781295137635958804": "752308894474174515"
                },
                hasPermission: (user, role) => true
            }, dividers: {
                roles: {
                    "764025729696268319": "770127096194269225",
                    "756742977971552286": "770119715808477244",
                    "764027219323912202": "770310986275618827",
                    "764248315553775656": "770310988938346526",
                    "764026501066129408": "781322220382453780",
                    "777269746722668565": "781322360967266344",
                },
                hasPermission: (user, role) => true
            }, misc: {
                roles: {
                    "742096993731477505": "772657659635171348",
                    "742096470462824468": "758482374232506397",
                    "742090483446317107": "753248752332046467"
                },
                hasPermission: (user, role) => true
            }, pronouns: {
                roles: {
                    "755500124091973703": "742068285553770529",
                    "742130938468630659": "742068282777141369",
                    "750462152199897208": "742068286719524865",
                    "742104449660747908": "772539432515534890"
                },
                hasPermission: (user, role) => true
            }
        }
        const map = new Map();
        map.set(data)
        console.log(map)

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
            const embedMessages = niraMessages.filter(msg => !msg.content.startsWith(emojis.spacer));
            let arr = Object.values(reactions);
            var x;
            for (var [key] of Object.entries(arr)) {
                for (x of arr[key]) {
                    embedMessages.array()[key].react(x)
                }
            }

            const pronounMessage = embedMessages.array()[3]
            const pronounReactionCollector = pronounMessage.createReactionCollector((reaction, user) => {
                return reactions.pronounsReact.includes(reaction.emoji.id)
            });
            pronounReactionCollector.on("collect", async (reaction, user) => {
                const reactionIndex = reactions.pronounsReact.findIndex(
                    reactionIdentifier => reactionIdentifier === reaction.emoji.id);
                    
                    if (reactionIndex === -1) {
                        return;
                    } else {
                        if (user.bot) {
                            return;
                        } else {
                            const potentialRoleID = roles.pronounsID[reactionIndex];
                            const member = reaction.message.guild.members.cache.get(user.id);
                            member.roles.add(potentialRoleID);
                        }
                    }
            });
        }
    })
};