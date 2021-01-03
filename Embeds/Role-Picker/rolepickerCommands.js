require("dotenv").config();
const configFileName = process.env.NIRA_DEV ? 'config.dev.json' : 'config.json';
const { emojis } = require(`../../${configFileName}`);

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
                hasPermission: (user, role) => user.roles.cache.find(r => r.name === "Rainbow Pass")
            }, dividers: {
                roles: {
                    "764025729696268319": "770127096194269225",
                    "756742977971552286": "770119715808477244",
                    "764027219323912202": "770310986275618827",
                    "764248315553775656": "770310988938346526",
                    "764026501066129408": "781322220382453780",
                    "777269746722668565": "781322360967266344",
                },
                hasPermission: (user, role) => user.guild.roles.cache
                .sorted((a, b) => a.comparePositionTo(b)).keyArray().some(function(guildRole) {
                    if (Object.values(data.dividers.roles).includes(guildRole))
                        this.roleMatch = guildRole == role;
                    return this.roleMatch && user.roles.cache.has(guildRole);
                }, { roleMatch: false })
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
        };

        if (niraMessages.size === 0) {
            channel.send(pronouns);
            channel.send(emojis.spacer);
            channel.send(miscellaneous);
            channel.send(emojis.spacer);
            channel.send(dividers);
            channel.send(emojis.spacer);
            channel.send(colours);
        }
        else {
            const embedMessages = niraMessages.filter(msg => !msg.content.startsWith(emojis.spacer));

            Object.values(data).forEach((picker, i) => {
                let message = embedMessages.array()[i];
                for(var reaction in picker.roles) {
                        message.react(reaction);
                }

                let collector = message.createReactionCollector(
                    reaction => picker.roles[reaction.emoji.id], { dispose: true }
                );
            
                function handleReaction(reaction, user, added) {
                    let role = picker.roles[reaction.emoji.id];
                    let member = reaction.message.guild.members.cache.get(user.id);
            
                    if (!user.bot) {
                        if (picker.hasPermission(member, role)) {
                            added ? member.roles.add(role) : member.roles.remove(role);
                        } else {
                            reaction.users.remove(user);
                        }
                    }
                }
            
                collector.on("collect", (reaction, user) => handleReaction(reaction, user, true));
                collector.on("remove", (reaction, user) => handleReaction(reaction, user, false));
            });
        }
    });
};