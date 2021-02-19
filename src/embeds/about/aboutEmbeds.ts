import { MessageEmbed } from 'discord.js';

export const about1 = new MessageEmbed()
  .setTitle('ずっと真夜中でいいのに。')
  .setDescription(
    'Zutto Mayonaka de Iinoni (abbreviated in English as ZUTOMAYO) are a Japanese rock group that debuted in 2018.',
  )
  .setColor('#F1D8F7')
  .addFields(
    { name: 'Origin', value: 'Japan', inline: true },
    { name: 'Genres', value: 'Rock, J-Pop', inline: true },
    { name: 'Years Active', value: '2018–Present', inline: true },
    { name: 'Label', value: 'EMI Records Japan', inline: true },
  );

export const about2 = new MessageEmbed()
  .setTitle('Origins')
  .setAuthor('Source: Wikipedia', 'https://i.imgur.com/u8AnEzu.jpg', 'https://en.wikipedia.org/wiki/Zutomayo')
  .setThumbnail('https://raw.githubusercontent.com/anomalilies/Nira-chan/master/Images/Space%20ACAne.gif')
  .setDescription(
    'On June 4th, 2018, ZUTOMAYO debuted via. YouTube with their first song, [秒針を噛む](https://youtu.be/GJI4Gv7NbmE) (Byoushin wo Kamu).',
  )
  .setColor('#F1D8F7')
  .addFields(
    {
      name: 'Byoushin wo Kamu',
      value:
        '• Within a week, the music video had garnered 200,000 views, becoming an immediate hit.\n• This sudden surge in popularity again resurfaced on August 30th, 2018, when *Byoushin wo Kamu* became the most streamed song that week in Japan.',
    },
    {
      name: 'Members',
      value:
        "• Despite the group's ever-growing popularity, they have never released a full member list, crediting different people for music, arrangements, and video production with each subsequent release.\n• The only reoccurring member is the vocalist and composer; An unidentified young woman known as ACA-Ne (ACAね).",
    },
  );

export const about3 = new MessageEmbed()
  .setTitle('Links')
  .setThumbnail('https://raw.githubusercontent.com/anomalilies/Nira-chan/master/Images/Uniguri.gif')
  .setDescription(
    '**[YouTube](https://www.youtube.com/c/ZUTOMAYO/)** | [(Staff)](https://twitter.com/zutomayo_staff) [Twitter](https://twitter.com/zutomayo) | [Instagram](https://www.instagram.com/zutomayo/) | [Official Website](https://www.zutomayo.com/)',
  )
  .setColor('#F1D8F7')
  .addFields(
    {
      name: 'Streaming Platforms',
      value:
        '• [Spotify](https://open.spotify.com/artist/38WbKH6oKAZskBhqDFA8Uj)\n• [Apple Music](https://music.apple.com/jp/artist/%E3%81%9A%E3%81%A3%E3%81%A8%E7%9C%9F%E5%A4%9C%E4%B8%AD%E3%81%A7%E3%81%84%E3%81%84%E3%81%AE%E3%81%AB/1428083875)\n• [YouTube Music](https://music.youtube.com/channel/UCrpcd5WtOrdCsx5cufc4JRQ)\n• [Google Play](https://play.google.com/store/music/artist/Zutomayo?id=A5linp6b6pqj2lnz5756n2oa354)\n• [Deezer](https://www.deezer.com/en/artist/52778562/)\n• [Amazon Music](https://music.amazon.com/artists/B07JHTFJSC/zutomayo)',
    },
    {
      name: 'Merchandise',
      value:
        'The official [ZUTOMAYO Store](https://store.zutomayo.com/) is currently only available for Japanese residents to purchase from.\nWe recommend either using a proxy service, or other international merchants such as [CDJapan](https://www.cdjapan.co.jp/person/700818465) and [Amazon.jp](https://www.amazon.co.jp/s?k=%E3%81%9A%E3%81%A3%E3%81%A8%E7%9C%9F%E5%A4%9C%E4%B8%AD%E3%81%A7%E3%81%84%E3%81%84%E3%81%AE%E3%81%AB%E3%80%82), to buy official goods.\nA tutorial on how to use ZenMarket can be found **__[here](https://docs.google.com/document/d/13SLLBzU8yGhS3PJ_rjBHq2IBxLMtBssDq9L7ApOLf5Y/edit?usp=sharing)__**.',
    },
  );

export const cd1 = new MessageEmbed()
  .setTitle('正しい偽りからの起床')
  .setThumbnail('https://raw.githubusercontent.com/anomalilies/Nira-chan/master/Images/1.jpg')
  .setDescription('Tadashii Itsuwari Kara no Kishō')
  .setColor('#F1D8F7')
  .addFields(
    { name: 'Release Date', value: 'November 14th, 2018', inline: true },
    { name: 'Oricon Weekly Albums Chart', value: 'Position: 8', inline: true },
    { name: 'Billboard Japan Hot 100', value: 'Position: 3', inline: true },
    {
      name: 'Track List',
      value:
        '1. Byoushin wo Kamu (秒針を噛む)\n2. Humanoid (ヒューマノイド)\n3. Saturn (サターン)\n4. Uni to Kuri (雲丹と栗)\n5. Nouriueno Cracker (脳裏上のクラッカー)\n6. Kimigaite Mizuninaru (君がいて水になる)',
    },
    {
      name: 'CD Exclusive Tracks',
      value:
        '7. Byoushin wo Kamu (Instrumental)\n8. Humanoid (Instrumental)\n9. Saturn (Instrumental)\n10. Uni to Kuri (Instrumental)\n11. Nouriueno Cracker (Instrumental)\n12. Kimigaite Mizuninaru (Instrumental)',
    },
  );

export const cd2 = new MessageEmbed()
  .setTitle('今は今で誓いは笑みで')
  .setThumbnail('https://raw.githubusercontent.com/anomalilies/Nira-chan/master/Images/2.jpg')
  .setDescription('Imawa Imade Chikaiwa Emide')
  .setColor('#F1D8F7')
  .addFields(
    { name: 'Release Date', value: 'June 12, 2019', inline: true },
    { name: 'Oricon Weekly Albums Chart', value: 'Position: 1', inline: true },
    { name: 'Billboard Japan Hot 100', value: 'Position: 1', inline: true },
    {
      name: 'Track List',
      value:
        '1. Kan Saete Kuyashiiwa (勘冴えて悔しいわ)\n2. Seigi (正義)\n3. Matane Maboroshi (またね幻)\n4. Minority Myakuraku (マイノリティ脈絡)\n5. Samayoi Yoi Ondo (彷徨い酔い温度)\n6. Mabushii DNA Dake (眩しいDNAだけ)',
    },
    {
      name: 'CD Exclusive Tracks',
      value:
        '7. Kan Saete Kuyashiiwa (Instrumental)\n8. Seigi (Instrumental)\n9. Matane Maboroshi (Instrumental)\n10. Minority Myakuraku (Instrumental)\n11. Samayoi Yoi Ondo (Instrumental)\n12. Mabushii DNA Dake (Instrumental)',
    },
  );

export const cd3 = new MessageEmbed()
  .setTitle('潜潜話')
  .setThumbnail('https://raw.githubusercontent.com/anomalilies/Nira-chan/master/Images/3.jpg')
  .setDescription('Hisohiso Banashi')
  .setColor('#F1D8F7')
  .addFields(
    { name: 'Release Date', value: 'October 30th, 2019', inline: true },
    { name: 'Oricon Weekly Albums Chart', value: 'Position: 5', inline: true },
    { name: 'Billboard Japan Hot 100', value: 'Position: 4', inline: true },
    {
      name: 'Track List',
      value:
        '1. Nouriueno Cracker (脳裏上のクラッカー)\n2. Kan Saete Kuyashiiwa (勘冴えて悔しいわ)\n3. Inemuri Enseitai (居眠り遠征隊)\n4. Haze Haseru Haterumade (ハゼ馳せる果てるまで)\n5. Kettobashita Moufu (蹴っ飛ばした毛布)\n6. Dear Mr 「F」\n7. Konnakoto Soudou (こんなこと騒動)\n8. Mabushii DNA Dake (眩しいDNAだけ)\n9. Humanoid (ヒューマノイド)\n10. Glass to Rum Raisin (グラスとラムレーズン)\n11. Seigi (正義)\n12. Yasashiku Last Smile (優しくLAST SMILE)\n13. Byoushin wo Kamu (秒針を噛む)',
    },
    {
      name: 'CD Exclusive Tracks - Disc 2',
      value:
        '1. Nouriueno Cracker (Instrumental)\n2. Kan Saete Kuyashiiwa (Instrumental)\n3. Inemuri Enseitai (Instrumental)\n4. Haze Haseru Haterumade (Instrumental)\n5. Kettobashita Moufu (Instrumental)\n6. Dear Mr 「F」 (Instrumental)\n7. Konnakoto Soudou (Instrumental)\n8. Mabushii DNA Dake (Instrumental)\n9. Humanoid (Instrumental)\n10. Glass to Rum Raisin (Instrumental)\n11. Seigi (Instrumental)\n12. Yasashiku Last Smile (Instrumental)\n13. Byoushin wo Kamu (Instrumental)',
    },
  );

export const cd4 = new MessageEmbed()
  .setTitle('朗らかな皮膚とて不服')
  .setThumbnail('https://raw.githubusercontent.com/anomalilies/Nira-chan/master/Images/4.jpg')
  .setDescription('Hogarakana Hifutote Fufuku')
  .setColor('#F1D8F7')
  .addFields(
    { name: 'Release Date', value: 'August 5, 2020', inline: true },
    { name: 'Oricon Weekly Albums Chart', value: 'Position: 2', inline: true },
    { name: 'Billboard Japan Hot 100', value: 'Position: 2', inline: true },
    {
      name: 'Track List',
      value:
        '1. Fastening (低血ボルト)\n2. Obenkyou Shitoiteyo (お勉強しといてよ)\n3. Ham\n4. JK BOMBER\n5. Marine Blue Garden (マリンブルーの庭園)\n6. MILABO',
    },
    {
      name: 'CD Exclusive Tracks',
      value:
        '7. Saturn [Acoustic ver.] (サターン) - *Limited edition only*\n7. Kettobashita Moufu [Bathroom Twin Piano Live (2020.05.06) ver.] (蹴っ飛ばした毛布) - *Normal edition only*\n8. Fastening (Instrumental)\n9. Obenkyou Shitoiteyo (Instrumental)\n10. Ham (Instrumental)\n11. JK BOMBER (Instrumental)\n12. Marine Blue Garden (Instrumental)\n13. MILABO (Instrumental)',
    },
  );

export const cd5 = new MessageEmbed()
  .setTitle('ぐされ')
  .setThumbnail('https://raw.githubusercontent.com/anomalilies/Nira-chan/master/Images/5.jpg')
  .setDescription('Gusare')
  .setColor('#F1D8F7')
  .addFields(
    { name: 'Release Date', value: 'February 10, 2021', inline: true },
    { name: 'Oricon Weekly Albums Chart', value: 'Position: N/A', inline: true },
    { name: 'Billboard Japan Hot 100', value: 'Position: N/A', inline: true },
    {
      name: 'Track List',
      value:
        "13 songs; Titles to be confirmed.\nWill include Darken (暗く黒く), Hunch Grey (勘ぐれい), and Can't Be Right (正しくなれない)!",
    },
    {
      name: 'CD Exclusive Tracks - Disc 2',
      value:
        'Instrumental editions of all songs, plus 10 8-bit remixes of older songs (2 per each regular CD, target-stores only).',
    },
  );
