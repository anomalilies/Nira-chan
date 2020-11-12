const Discord = require("discord.js");

global.about1 = new Discord.MessageEmbed()
  .setTitle("ずっと真夜中でいいのに。")
  .setDescription("Zutto Mayonaka de Iinoni (abbreviated in English as ZUTOMAYO) are a Japanese rock group that debuted in 2018.")
  .setColor(15849719)
  .addFields(
    {name: "Origin", value: "Japan", inline: true},
    {name: "Genres", value: "Rock, J-Pop", inline: true},
    {name: "Years Active", value: "2018–Present", inline: true},
    {name: "Label", value: "EMI Records Japan", inline: true}
);
global.about2 = new Discord.MessageEmbed()
  .setTitle("Origins")
  .setAuthor("Source: Wikipedia", "https://i.imgur.com/u8AnEzu.jpg", "https://en.wikipedia.org/wiki/Zutomayo")
  .setThumbnail("https://i.imgur.com/MphIkv3.gif")
  .setDescription("On June 4th, 2018, ZUTOMAYO debuted via. YouTube with their first song, [秒針を噛む](https://youtu.be/GJI4Gv7NbmE) (Byoushin wo Kamu).")
  .setColor(15849719)
  .addFields(
    {name: "Byoushin wo Kamu", value: "• Within a week, the music video had garnered 200,000 views, becoming an immediate hit.\n• This sudden surge in popularity again resurfaced on August 30th, 2018, when *Byoushin wo Kamu* became the most streamed song that week in Japan."},
    {name: "Members", value: "• Despite the group's ever-growing popularity, they have never released a full member list, crediting different people for music, arrangements, and video production with each subsequent release.\n• The only reoccurring member is the vocalist and composer; An unidentified young woman known as ACA-Ne (ACAね)."}
);
global.about3 = new Discord.MessageEmbed()
  .setTitle("Links")
  .setThumbnail("https://i.imgur.com/zfyIJFi.gif")
  .setDescription("**[YouTube](https://www.youtube.com/c/ZUTOMAYO/)** | [(Staff)](https://twitter.com/zutomayo_staff) [Twitter](https://twitter.com/zutomayo) | [Instagram](https://www.instagram.com/zutomayo/) | [Official Website](https://www.zutomayo.com/)")
  .setColor(15849719)
  .addFields(
    {name: "Streaming Platforms", value: "• [Spotify](https://open.spotify.com/artist/38WbKH6oKAZskBhqDFA8Uj)\n• [Apple Music](https://music.apple.com/jp/artist/%E3%81%9A%E3%81%A3%E3%81%A8%E7%9C%9F%E5%A4%9C%E4%B8%AD%E3%81%A7%E3%81%84%E3%81%84%E3%81%AE%E3%81%AB/1428083875)\n• [YouTube Music](https://music.youtube.com/channel/UCrpcd5WtOrdCsx5cufc4JRQ)\n• [Google Play](https://play.google.com/store/music/artist/Zutomayo?id=A5linp6b6pqj2lnz5756n2oa354)\n• [Deezer](https://www.deezer.com/en/artist/52778562/)\n• [Amazon Music](https://music.amazon.com/artists/B07JHTFJSC/zutomayo)"},
    {name: "Merchandise", value: "The official [ZUTOMAYO Store](https://store.zutomayo.com/) is currently only available for Japanese residents to purchase from.\nWe recommend either using a proxy service, or other international merchants such as [CDJapan](https://www.cdjapan.co.jp/person/700818465) and [Amazon.jp](https://www.amazon.co.jp/s?k=%E3%81%9A%E3%81%A3%E3%81%A8%E7%9C%9F%E5%A4%9C%E4%B8%AD%E3%81%A7%E3%81%84%E3%81%84%E3%81%AE%E3%81%AB%E3%80%82), to buy official goods.\nA tutorial on how to use ZenMarket can be found **__[here](https://docs.google.com/document/d/13SLLBzU8yGhS3PJ_rjBHq2IBxLMtBssDq9L7ApOLf5Y/edit?usp=sharing)__**."}
);
global.cd1 = new Discord.MessageEmbed()
  .setTitle("正しい偽りからの起床")
  .setThumbnail("https://i.imgur.com/gxKYhtJ.jpg")
  .setDescription("Tadashii Itsuwari Kara no Kishō")
  .setColor(15849719)
  .addFields(
    {name: "Release Date", value: "November 14th, 2018", inline: true},
    {name: "Oricon Weekly Albums Chart", value: "Position: 8", inline: true},
    {name: "Billboard Japan Hot 100", value: "Position: 3", inline: true},
    {name: "Track List", value: "1. Byoushin wo Kamu (秒針を噛む)\n2. Humanoid (ヒューマノイド)\n3. Saturn (サターン)\n4. Uni to Kuri (雲丹と栗)\n5. Nouriueno Cracker (脳裏上のクラッカー)\n6. Kimigaite Mizuninaru (君がいて水になる)"},
    {name: "CD Exclusive Tracks", value: "7. Byoushin wo Kamu (Instrumental)\n8. Humanoid (Instrumental)\n9. Saturn (Instrumental)\n10. Uni to Kuri (Instrumental)\n11. Nouriueno Cracker (Instrumental)\n12. Kimigaite Mizuninaru (Instrumental)"}
);
global.cd2 = new Discord.MessageEmbed()
  .setTitle("今は今で誓いは笑みで")
  .setThumbnail("https://i.imgur.com/mYtIyrZ.jpg")
  .setDescription("Imawa Imade Chikaiwa Emide")
  .setColor(15849719)
  .addFields(
    {name: "Release Date", value: "June 12, 2019", inline: true},
    {name: "Oricon Weekly Albums Chart", value: "Position: 1", inline: true},
    {name: "Billboard Japan Hot 100", value: "Position: 1", inline: true},
    {name: "Track List", value: "1. Kan Saete Kuyashiiwa (勘冴えて悔しいわ)\n2. Seigi (正義)\n3. Matane Maboroshi (またね幻)\n4. Minority Myakuraku (マイノリティ脈絡)\n5. Samayoi Yoi Ondo (彷徨い酔い温度)\n6. Mabushii DNA Dake (眩しいDNAだけ)"},
    {name: "CD Exclusive Tracks", value: "7. Kan Saete Kuyashiiwa (Instrumental)\n8. Seigi (Instrumental)\n9. Matane Maboroshi (Instrumental)\n10. Minority Myakuraku (Instrumental)\n11. Samayoi Yoi Ondo (Instrumental)\n12. Mabushii DNA Dake (Instrumental)"}
);
global.cd3 = new Discord.MessageEmbed()
  .setTitle("潜潜話")
  .setThumbnail("https://i.imgur.com/k8Imhrc.jpg")
  .setDescription("Hisohiso Banashi")
  .setColor(15849719)
  .addFields(
    {name: "Release Date", value: "October 30th, 2019", inline: true},
    {name: "Oricon Weekly Albums Chart", value: "Position: 5", inline: true},
    {name: "Billboard Japan Hot 100", value: "Position: 4", inline: true},
    {name: "Track List", value: "1. Nouriueno Cracker (脳裏上のクラッカー)\n2. Kan Saete Kuyashiiwa (勘冴えて悔しいわ)\n3. Inemuri Enseitai (居眠り遠征隊)\n4. Haze Haseru Haterumade (ハゼ馳せる果てるまで)\n5. Kettobashita Moufu (蹴っ飛ばした毛布)\n6. Dear Mr 「F」\n7. Konnakoto Soudou (こんなこと騒動)\n8. Mabushii DNA Dake (眩しいDNAだけ)\n9. Humanoid (ヒューマノイド)\n10. Glass to Rum Raisin (グラスとラムレーズン)\n11. Seigi (正義)\n12. Yasashiku Last Smile (優しくLAST SMILE)\n13. Byoushin wo Kamu (秒針を噛む)"},
    {name: "CD Exclusive Tracks - Disc 2", value: "1. Nouriueno Cracker (Instrumental)\n2. Kan Saete Kuyashiiwa (Instrumental)\n3. Inemuri Enseitai (Instrumental)\n4. Haze Haseru Haterumade (Instrumental)\n5. Kettobashita Moufu (Instrumental)\n6. Dear Mr 「F」 (Instrumental)\n7. Konnakoto Soudou (Instrumental)\n8. Mabushii DNA Dake (Instrumental)\n9. Humanoid (Instrumental)\n10. Glass to Rum Raisin (Instrumental)\n11. Seigi (Instrumental)\n12. Yasashiku Last Smile (Instrumental)\n13. Byoushin wo Kamu (Instrumental)"}
);
global.cd4 = new Discord.MessageEmbed()
  .setTitle("朗らかな皮膚とて不服")
  .setThumbnail("https://i.imgur.com/4ebpynM.jpg")
  .setDescription("Hogarakana Hifutote Fufuku")
  .setColor(15849719)
  .addFields(
    {name: "Release Date", value: "August 5, 2020", inline: true},
    {name: "Oricon Weekly Albums Chart", value: "Position: 2", inline: true},
    {name: "Billboard Japan Hot 100", value: "Position: 2", inline: true},
    {name: "Track List", value: "1. Fastening (低血ボルト)\n2. Obenkyou Shitoiteyo (お勉強しといてよ)\n3. Ham\n4. JK BOMBER\n5. Marine Blue Garden (マリンブルーの庭園)\n6. MILABO"},
    {name: "CD Exclusive Tracks", value: "7. Saturn [Acoustic ver.] (サターン) - *Limited edition only*\n7. Kettobashita Moufu [Bathroom Twin Piano Live (2020.05.06) ver.] (蹴っ飛ばした毛布) - *Normal edition only*\n8. Fastening (Instrumental)\n9. Obenkyou Shitoiteyo (Instrumental)\n10. Ham (Instrumental)\n11. JK BOMBER (Instrumental)\n12. Marine Blue Garden (Instrumental)\n13. MILABO (Instrumental)"}
);
global.cd5 = new Discord.MessageEmbed()
  .setTitle("ぐされ")
  .setThumbnail("https://i.imgur.com/LIxwE6H.jpg")
  .setDescription("Gusare")
  .setColor(15849719)
  .addFields(
    {name: "Release Date", value: "February 10, 2020", inline: true},
    {name: "Oricon Weekly Albums Chart", value: "Position: N/A", inline: true},
    {name: "Billboard Japan Hot 100", value: "Position: N/A", inline: true},
    {name: "Track List", value: "13 songs; Titles to be confirmed.\nWill include *Kuraku Kuroku* (暗く黒く) and the OP for *The Promised Neverland* live-action film."},
    {name: "CD Exclusive Tracks - Disc 2", value: "Instrumental editions of all songs, plus 10 8-bit remixes of older songs (2 per each regular CD, target-stores only)."}
);

global.rule1 = new Discord.MessageEmbed()
  .setTitle("1. General Kindness and Decency")
  .setDescription("Condescending talk towards others, tasteless humour, outright insults, and harassment are not to be tolerated.\nPlease be respectful of everyone, regardless of their identity, and if things get heated, do not feel afraid to ping our <@&742061218860236840>.\n\nYou can also report members with the following command, for our staff to later review if they are inactive:\n`-report @user [reason]`")
  .addFields(
    {name: "Moderation", value: "1. After the first breach of this rule, the user will be reminded of our policy.\n2. If the user's behaviour continues, they will be warned.\n3. After 5 violations,  the user will be temporarily muted.\n4. If behaviour continues, the user will be kicked from the server.\n5. If the user joins again and continues to be rude, they will be permanently banned."}
);
global.rule4 = new Discord.MessageEmbed()
  .setTitle("4. Stay Out of Sensitive Discussion and Politics")
  .setDescription("We aim to dedicate this server to casual discussion about ZUTOMAYO, not bitter arguments about your political beliefs or the posting of sensitive content.\n\nAll serious discussions should take place in their dedicated channel over at <#753249149415325826>, which is able to be accessed from <#758494476174884905>.\nHowever, please note that our members are not your personal therapists. We will always ask that you seek __professional help__ when mentioning major/criminal/urgent issues, with all posts that address these topics to be deleted immediately.\n\nFor content that is potentially triggering (which ideally shouldn't become a topic in the first place), please use spoilers ||like so||.\nSpoilers can be used by surrounding the offending text with `||`, in the same manner one would make text bold or italicised.")
  .addFields(
    {name: "Moderation", value: "1. After the first breach of this rule, the user will be reminded of our policy.\n2. If the user's behaviour continues, they will be warned.\n3. After 5 violations,  the user will be temporarily muted.\n4. If behaviour continues, the user will be kicked from the server.\n5. If the user joins again and continues to be rude, they will be permanently banned."}
);
global.rule9 = new Discord.MessageEmbed()
  .setTitle("9. Refrain from Backseat Moderation")
  .setDescription("Please do not undermine the server's staff, nor 'backseat' moderate; Reminding someone of the rules is very different to telling someone what they can and cannot do!\nOur <@&742061218860236840> are capable in handling conflict, so always feel free to ping them when necessary, instead of giving out your own advice!")
  .addFields(
    {name: "Moderation", value: "1. The user will be warned if necessary, and reminded of our policy."}
);