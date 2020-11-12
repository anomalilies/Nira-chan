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

global.rule6 = new Discord.MessageEmbed()
  .setTitle("6. Keep the Group’s Identity a Secret")
  .setDescription("Images can easily be found of the group's identities, particularly that of ACAね.\nHowever, since ZUTOMAYO have always been secretive by nature, we plan on upholding this standard due to the publicity of our server, and any information regarding the group's identity will be deleted *without warning*.")
  .addFields(
    {name: "Moderation", value: "1. The content will be deleted immediately, and the user will be reminded of alternative options to post similar content.\n2. If the user's behaviour continues, they will be temporarily muted."}
);
global.rule7 = new Discord.MessageEmbed()
  .setTitle("7. Support ZUTOMAYO Wherever Possible")
  .setDescription("We will always share links and information on how you can support the band, whether financially or otherwise, so please check them out when they become available!\nAs a server, we also strive on being able to provide exclusive content that is hard-to-find outside of Japan for international fans wherever possible.\nHowever, illegal piracy of copyrighted goods, particularly those of that are easily accessible (including, but not limited to, CD rips), will **not** be tolerated.\nWe will also not support illegal distribution of copied merch; For more information on how to buy official goods, please see <#760625396487684126>.\n\nPlease be aware that links our members generously provide will be monitored to uphold these standards, and **can therefore be removed at any time.**")
  .addFields(
    {name: "Moderation", value: "1. The offending content will be deleted immediately, and the user will be warned.\n2. If the user's behaviour continues, they will be temporarily muted.\n3. If the rule is violated again, the user will be kicked.\n4. If the user joins and continues to post content that breaks the rules, they will be permanently banned."}
);