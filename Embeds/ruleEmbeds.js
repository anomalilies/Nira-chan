const Discord = require("discord.js");

global.rule1 = new Discord.MessageEmbed()
    .setTitle("1. General Kindness and Decency")
    .setDescription("Condescending talk towards others, tasteless humour, outright insults, and harassment are not to be tolerated.\nPlease be respectful of everyone, regardless of their identity, and if things get heated, do not feel afraid to ping the moderation team.\n\nYou can also report members with the following command, for our mods to later review if they are inactive:\n`-report @user [reason]`")
    .addFields(
        {
            name: "Moderation",
            value: "1. After the first breach of this rule, the user will be reminded of our policy.\n2. If the user's behaviour continues, they will be warned.\n3. After 5 violations,  the user will be temporarily muted.\n4. If behaviour continues, the user will be kicked from the server.\n5. If the user joins again and continues to be rude, they will be permanently banned."
        }
    )

global.rule2 = new Discord.MessageEmbed()
    .setTitle("2. No NSFW Content")
    .setDescription("ZUTOMAYO aren't known for NSFW content, and neither are we.\nNot all of our members are over 18, so please keep this server a SFW chat for all!\n**This includes Rule 34/images depicting fictional characters.**")
    .addFields(
        {
            name: "Moderation",
            value: "1. The offending content will be deleted immediately, and the user will be warned.\n2. If the user's behaviour continues, they will be temporarily muted.\n3. If the rule is violated again, the user will be kicked.\n4. If the user joins and continues to post content that breaks the rules, they will be permanently banned."
        }
    )

global.rule3 = new Discord.MessageEmbed()
    .setTitle("3. Keep Spamming to a Minimum")
    .setDescription("Please do not use the server to relentlessly spam whatever you feel like! \nAuto-moderation measures are in place to combat spammers and bots, as are specified channels under the `Spamming` category to prevent discussions from being flooded.")
    .addFields(
        {
            name: "Moderation",
            value: "1. Our auto-moderation measures will temporarily mute any user who has posted 5 times within 2 seconds.\n2. If behaviour continues, the user will be kicked, or permanently banned if necessary/they are thought to be a bot."
        }
    )

global.rule4 = new Discord.MessageEmbed()
    .setTitle("4. Stay Out of Sensitive Discussion and Politics")
    .setDescription("We aim to dedicate this server to casual discussion about ZUTOMAYO, not bitter arguments about your political beliefs or the posting of sensitive content.\n\nAll serious discussions should take place in their dedicated channel over at `#serious-discussion`, which is able to be accessed from `#role-shop`.\nHowever, please note that our members are not your personal therapists. We will always ask that you seek __professional help__ when mentioning major/criminal/urgent issues, with all posts that address these topics to be deleted immediately.\n\nFor content that is potentially triggering (which ideally shouldn't become a topic in the first place), please use spoilers ||like so||.\nSpoilers can be used by surrounding the offending text with `||`, in the same manner one would make text bold or italicised.")
    .addFields(
        {
            name: "Moderation",
            value: "1. After the first breach of this rule, the user will be reminded of our policy.\n2. If the user's behaviour continues, they will be warned.\n3. After 5 violations,  the user will be temporarily muted.\n4. If behaviour continues, the user will be kicked from the server.\n5. If the user joins again and continues to be rude, they will be permanently banned."
        }
    )

global.rule5 = new Discord.MessageEmbed()
    .setTitle("5. Post Content in its Dedicated Channel")
    .setDescription("Mistakes happen, and you might accidentally post something in the wrong channel, but we otherwise strive to keep this server neat and tidy.\nWe have tons of channels, so please familarise yourself with all of them before posting!")
    .addFields(
        {
            name: "Moderation",
            value: "1. Moderators and Admins will attempt to move conversations to their designated, or otherwise suitable, channel whenever necessary."
        }
    )

global.rule6 = new Discord.MessageEmbed()
    .setTitle("6. Keep the Group’s Identity a Secret")
    .setDescription("Images can easily be found of the group's identities, particularly that of ACAね.\nHowever, since ZUTOMAYO have always been secretive by nature, we plan on upholding this standard due to the publicity of our server, and any information regarding the group's identity will be deleted *without warning*.\n\nWe suggest heading to our sister server, [ZUTOMAYO Archive](https://discord.gg/pnM8AjX), for conversations of a similar nature.")
    .addFields(
        {
            name: "Moderation",
            value: "1. The content will be deleted immediately, and the user will be reminded of alternative options to post similar content.\n2. If the user's behaviour continues, they will be temporarily muted."
        }
    )

global.rule7 = new Discord.MessageEmbed()
    .setTitle("7. Support ZUTOMAYO Wherever Possible")
    .setDescription("We will always share links and information on how you can support the band, whether financially or otherwise, so please check them out when they become available!\nAs a server, we also strive on being able to provide exclusive content that is hard-to-find outside of Japan for international fans wherever possible.\nHowever, illegal piracy of copyrighted goods, particularly those of that are easily accessible (including, but not limited to, CD rips), will **not** be tolerated.\n\nPlease be aware that links our members generously provide will be monitored to uphold these standards, and can therefore be removed at any time.**")
    .addFields(
        {
            name: "Moderation",
            value: "1. The offending content will be deleted immediately, and the user will be warned.\n2. If the user's behaviour continues, they will be temporarily muted.\n3. If the rule is violated again, the user will be kicked.\n4. If the user joins and continues to post content that breaks the rules, they will be permanently banned."
        }
    )

global.rule8 = new Discord.MessageEmbed()
    .setTitle("8. Keep the Server Free from Toxicity")
    .setDescription("ZUTOMAYO ZONE is a considered by many to be a safe haven from all the toxicity they may struggle with in both real and virtual life.\nAs such, one of our main goals as a server is to focus on freeing any signs of hateful behaviour and negative influences.\nWe want keep the ZONE as welcoming as it has always been whilst we continue to grow, and make our newcomers feel safe and welcome.")
    .addFields(
        {
            name: "Moderation",
            value: "1. If a user is thought to be adding a negative influence to the server (i.e: being manipulative and critical of others, putting them down, and being immune to abstract thinking, etc.), the Moderation team will contact them directly about their behaviour, as to give them an opportunity to learn and change.\n2. However. if behaviour continues, they face the risk of being muted, kicked, or banned, depending on each individual circumstance."
        }
    )

global.rule9 = new Discord.MessageEmbed()
    .setTitle("9. Refrain from Backseat Moderation")
    .setDescription("Please do not undermine the server's staff, nor 'backseat' moderate; Reminding someone of the rules is very different to telling someone what they can and cannot do!\nOur Moderators are capable in handling conflict, so always feel free to ping them when necessary, instead of giving out your own advice!")
    .addFields(
        {
            name: "Moderation",
            value: "1. The user will be warned if necessary, and reminded of our policy."
        }
    )

global.rule10 = new Discord.MessageEmbed()
    .setTitle("10. Have Fun!")
    .setDescription("As possibly one of our most important rules, we just want you to have fun!\nWith all the serious garble out of the way, ultimately we're all here to support one of our favourite artists, ZUTOMAYO.\nOur server thrives on the positive and caring spirit shown by our community, and by joining us, we hope that you'll contribute to this.")
    .addFields(
        {
            name: "Moderation",
            value: "1. The offending content will be deleted immediately, and the user will be warned.\n2. If the user's behaviour continues, they will be temporarily muted.\n3. If the rule is violated again, the user will be kicked.\n 4. If the user joins and continues to post content that breaks the rules, they will be permanently banned."
        }
    )
