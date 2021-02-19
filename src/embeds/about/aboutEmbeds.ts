import { oneLine, stripIndent } from 'common-tags';
import { MessageEmbed } from 'discord.js';

export const about1 = new MessageEmbed({
  title: 'ずっと真夜中でいいのに。',
  color: '#F1D8F7',
  description: oneLine`
    Zutto Mayonaka de Iinoni (abbreviated in English as ZUTOMAYO) are a 
    Japanese rock group that debuted in 2018.
  `,
  fields: [
    { name: 'Origin', value: 'Japan', inline: true },
    { name: 'Genres', value: 'Rock, J-Pop', inline: true },
    { name: 'Years Active', value: '2018–Present', inline: true },
    { name: 'Label', value: 'EMI Records Japan', inline: true },
  ],
});

export const about2 = new MessageEmbed({
  title: 'Origins',
  author: {
    name: 'Source: Wikipedia',
    iconURL: 'https://i.imgur.com/u8AnEzu.jpg',
    url: 'https://en.wikipedia.org/wiki/Zutomayo',
  },
  color: '#F1D8F7',
  thumbnail: { url: 'https://raw.githubusercontent.com/anomalilies/Nira-chan/master/Images/Space%20ACAne.gif' },
  description: oneLine`
    'On June 4th, 2018, ZUTOMAYO debuted via. YouTube with their first song,
    [秒針を噛む](https://youtu.be/GJI4Gv7NbmE) (Byoushin wo Kamu).',
  `,
  fields: [
    {
      name: 'Byoushin wo Kamu',
      value: oneLine`
        • Within a week, the music video had garnered 200,000 views, becoming an immediate hit.\n
        • This sudden surge in popularity again resurfaced on August 30th, 2018, when *Byoushin wo Kamu* became
        the most streamed song that week in Japan.
      `,
    },
    {
      name: 'Members',
      value: oneLine`
        • Despite the group's ever-growing popularity, they have never released a full member list, crediting
        different people for music, arrangements, and video production with each subsequent release.\n
        • The only reoccurring member is the vocalist and composer; An unidentified
        young woman known as ACA-Ne (ACAね).
      `,
    },
  ],
});

export const about3 = new MessageEmbed({
  title: 'Links',
  thumbnail: { url: 'https://raw.githubusercontent.com/anomalilies/Nira-chan/master/Images/Uniguri.gif' },
  color: '#F1D8F7',
  description: oneLine`
    **[YouTube](https://www.youtube.com/c/ZUTOMAYO/)** |
    [(Staff)](https://twitter.com/zutomayo_staff) [Twitter](https://twitter.com/zutomayo) |
    [Instagram](https://www.instagram.com/zutomayo/) |
    [Official Website](https://www.zutomayo.com/)
  `,
  fields: [
    {
      name: 'Streaming Platforms',
      value: stripIndent`
        • [Spotify](https://open.spotify.com/artist/38WbKH6oKAZskBhqDFA8Uj)
        • [Apple Music](https://music.apple.com/jp/artist/%E3%81%9A%E3%81%A3%E3%81%A8%E7%9C%9F%E5%A4%9C%E4%B8%AD%E3%81%A7%E3%81%84%E3%81%84%E3%81%AE%E3%81%AB/1428083875)
        • [YouTube Music](https://music.youtube.com/channel/UCrpcd5WtOrdCsx5cufc4JRQ)
        • [Google Play](https://play.google.com/store/music/artist/Zutomayo?id=A5linp6b6pqj2lnz5756n2oa354)
        • [Deezer](https://www.deezer.com/en/artist/52778562/)
        • [Amazon Music](https://music.amazon.com/artists/B07JHTFJSC/zutomayo)
      `,
    },
    {
      name: 'Merchandise',
      value: oneLine`
        The official [ZUTOMAYO Store](https://store.zutomayo.com/) is currently only available for Japanese
        residents to purchase from.\n
        We recommend either using a proxy service, or other international
        merchants such as [CDJapan](https://www.cdjapan.co.jp/person/700818465) and
        [Amazon.jp](https://www.amazon.co.jp/s?k=%E3%81%9A%E3%81%A3%E3%81%A8%E7%9C%9F%E5%A4%9C%E4%B8%AD%E3%81%A7%E3%81%84%E3%81%84%E3%81%AE%E3%81%AB%E3%80%82),
        to buy official goods.\n
        A tutorial on how to use ZenMarket can be found **__[here](https://docs.google.com/document/d/13SLLBzU8yGhS3PJ_rjBHq2IBxLMtBssDq9L7ApOLf5Y/edit?usp=sharing)__**.
      `,
    },
  ],
});

export const cd1 = new MessageEmbed({
  title: '正しい偽りからの起床',
  thumbnail: { url: 'https://raw.githubusercontent.com/anomalilies/Nira-chan/master/Images/1.jpg' },
  description: 'Tadashii Itsuwari Kara no Kishō',
  color: '#F1D8F7',
  fields: [
    { name: 'Release Date', value: 'November 14th, 2018', inline: true },
    { name: 'Oricon Weekly Albums Chart', value: 'Position: 8', inline: true },
    { name: 'Billboard Japan Hot 100', value: 'Position: 3', inline: true },
    {
      name: 'Track List',
      value: stripIndent`
        1. Byoushin wo Kamu (秒針を噛む)
        2. Humanoid (ヒューマノイド)
        3. Saturn (サターン)
        4. Uni to Kuri (雲丹と栗)
        5. Nouriueno Cracker (脳裏上のクラッカー)
        6. Kimigaite Mizuninaru (君がいて水になる)
      `,
    },
    {
      name: 'CD Exclusive Tracks',
      value: stripIndent`
        7. Byoushin wo Kamu (Instrumental)
        8. Humanoid (Instrumental)
        9. Saturn (Instrumental)
        10. Uni to Kuri (Instrumental)
        11. Nouriueno Cracker (Instrumental)
        12. Kimigaite Mizuninaru (Instrumental)
      `,
    },
  ],
});

export const cd2 = new MessageEmbed({
  title: '今は今で誓いは笑みで',
  thumbnail: { url: 'https://raw.githubusercontent.com/anomalilies/Nira-chan/master/Images/2.jpg' },
  description: 'Imawa Imade Chikaiwa Emide',
  color: '#F1D8F7',
  fields: [
    { name: 'Release Date', value: 'June 12, 2019', inline: true },
    { name: 'Oricon Weekly Albums Chart', value: 'Position: 1', inline: true },
    { name: 'Billboard Japan Hot 100', value: 'Position: 1', inline: true },
    {
      name: 'Track List',
      value: stripIndent`
        1. Kan Saete Kuyashiiwa (勘冴えて悔しいわ)
        2. Seigi (正義)
        3. Matane Maboroshi (またね幻)
        4. Minority Myakuraku (マイノリティ脈絡)
        5. Samayoi Yoi Ondo (彷徨い酔い温度)
        6. Mabushii DNA Dake (眩しいDNAだけ)
      `,
    },
    {
      name: 'CD Exclusive Tracks',
      value: stripIndent`
        7. Kan Saete Kuyashiiwa (Instrumental)
        8. Seigi (Instrumental)
        9. Matane Maboroshi (Instrumental)
        10. Minority Myakuraku (Instrumental)
        11. Samayoi Yoi Ondo (Instrumental)
        12. Mabushii DNA Dake (Instrumental)
      `,
    },
  ],
});

export const cd3 = new MessageEmbed({
  title: '潜潜話',
  thumbnail: { url: 'https://raw.githubusercontent.com/anomalilies/Nira-chan/master/Images/3.jpg' },
  description: 'Hisohiso Banashi',
  color: '#F1D8F7',
  fields: [
    { name: 'Release Date', value: 'October 30th, 2019', inline: true },
    { name: 'Oricon Weekly Albums Chart', value: 'Position: 5', inline: true },
    { name: 'Billboard Japan Hot 100', value: 'Position: 4', inline: true },
    {
      name: 'Track List',
      value: stripIndent`
        1. Nouriueno Cracker (脳裏上のクラッカー)
        2. Kan Saete Kuyashiiwa (勘冴えて悔しいわ)
        3. Inemuri Enseitai (居眠り遠征隊)
        4. Haze Haseru Haterumade (ハゼ馳せる果てるまで)
        5. Kettobashita Moufu (蹴っ飛ばした毛布)
        6. Dear Mr 「F」
        7. Konnakoto Soudou (こんなこと騒動)
        8. Mabushii DNA Dake (眩しいDNAだけ)
        9. Humanoid (ヒューマノイド)
        10. Glass to Rum Raisin (グラスとラムレーズン)
        11. Seigi (正義)
        12. Yasashiku Last Smile (優しくLAST SMILE)
        13. Byoushin wo Kamu (秒針を噛む)
      `,
    },
    {
      name: 'CD Exclusive Tracks - Disc 2',
      value: stripIndent`
        1. Nouriueno Cracker (Instrumental)
        2. Kan Saete Kuyashiiwa (Instrumental)
        3. Inemuri Enseitai (Instrumental)
        4. Haze Haseru Haterumade (Instrumental)
        5. Kettobashita Moufu (Instrumental)
        6. Dear Mr 「F」 (Instrumental)
        7. Konnakoto Soudou (Instrumental)
        8. Mabushii DNA Dake (Instrumental)
        9. Humanoid (Instrumental)1
        10. Glass to Rum Raisin (Instrumental)
        11. Seigi (Instrumental)
        12. Yasashiku Last Smile (Instrumental)
        13. Byoushin wo Kamu (Instrumental)
      `,
    },
  ],
});

export const cd4 = new MessageEmbed({
  title: '朗らかな皮膚とて不服',
  thumbnail: { url: 'https://raw.githubusercontent.com/anomalilies/Nira-chan/master/Images/4.jpg' },
  description: 'Hogarakana Hifutote Fufuku',
  color: '#F1D8F7',
  fields: [
    { name: 'Release Date', value: 'August 5, 2020', inline: true },
    { name: 'Oricon Weekly Albums Chart', value: 'Position: 2', inline: true },
    { name: 'Billboard Japan Hot 100', value: 'Position: 2', inline: true },
    {
      name: 'Track List',
      value: stripIndent`
        1. Fastening (低血ボルト)
        2. Obenkyou Shitoiteyo (お勉強しといてよ)
        3. Ham
        4. JK BOMBER
        5. Marine Blue Garden (マリンブルーの庭園)
        6. MILABO
      `,
    },
    {
      name: 'CD Exclusive Tracks',
      value: stripIndent`
        7. Saturn [Acoustic ver.] (サターン) - *Limited edition only*
        7. Kettobashita Moufu [Bathroom Twin Piano Live (2020.05.06) ver.] (蹴っ飛ばした毛布) - *Normal edition only*
        8. Fastening (Instrumental)
        9. Obenkyou Shitoiteyo (Instrumental)
        10. Ham (Instrumental)
        11. JK BOMBER (Instrumental)
        12. Marine Blue Garden (Instrumental)
        13. MILABO (Instrumental)
      `,
    },
  ],
});

export const cd5 = new MessageEmbed({
  title: 'ぐされ',
  thumbnail: { url: 'https://raw.githubusercontent.com/anomalilies/Nira-chan/master/Images/5.jpg' },
  description: 'Gusare',
  color: '#F1D8F7',
  fields: [
    { name: 'Release Date', value: 'February 10, 2021', inline: true },
    { name: 'Oricon Weekly Albums Chart', value: 'Position: N/A', inline: true },
    { name: 'Billboard Japan Hot 100', value: 'Position: N/A', inline: true },
    {
      name: 'Track List',
      value: oneLine`
        13 songs; Titles to be confirmed.\n
        Will include Darken (暗く黒く), Hunch Grey (勘ぐれい), and Can't Be Right (正しくなれない)!
      `,
    },
    {
      name: 'CD Exclusive Tracks - Disc 2',
      value: oneLine`
        Instrumental editions of all songs, plus 10 8-bit remixes of older
        songs (2 per each regular CD, target-stores only).
      `,
    },
  ],
});
