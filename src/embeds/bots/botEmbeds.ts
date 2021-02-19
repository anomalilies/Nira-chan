import { oneLine, stripIndent } from 'common-tags';
import { MessageEmbed } from 'discord.js';

export const bc1 = new MessageEmbed({
  title: '💰 | Economy and Income',
  color: '#F1D8F7',
  fields: [
    { name: "Get the Server's Economy Stats", value: '`economy`' },
    { name: 'Desposit Money to Your Account', value: '`deposit`' },
    { name: 'Withdraw Money From Your Account', value: '`withdraw`' },
    { name: 'Give Money to Another User', value: '`give-money`' },
    { name: 'Check Your Balance', value: '`money`' },
    { name: "Check the Server's Leaderboard", value: '`leaderboard`' },
    { name: 'Collect Your Income', value: '`collect-income`' },
    { name: 'Work to Get Money', value: '`work`' },
    { name: 'Commit a Crime to Get Money', value: '`crime`' },
  ],
});

export const bc2 = new MessageEmbed({
  title: '🎲 | Fun and Games',
  color: '#F1D8F7',
  fields: [
    { name: 'Play Truth or Dare', value: '`truth-or-dare`\nExample: `!truth-or-dare truth` `!truth-or-dare dare`' },
    { name: 'Get a Random Dog Picture', value: '`dog`' },
    { name: 'Get a Random Cat Picture', value: '`cat`' },
    { name: 'Get a Random Dad Joke', value: '`dad-joke`' },
    { name: 'Play a Game of Akinator', value: '`akinator`' },
  ],
});

export const bc3 = new MessageEmbed({
  title: '🎰 | Gambling',
  color: '#F1D8F7',
  fields: [
    {
      name: 'Blackjack',
      value: oneLine`
        The aim of blackjack is to beat the dealer's hand, without going over 21,
        and with the least amount of cards.\n
        Play a Game: \`blackjack <bet>\` | Example: \`!blackjack 100\`\n\n
        Take Another Card: \`hit\`\n
        Skip a Turn: \`stand\`\n
        Double Your Bet, and Take Another Card: \`double down\`\n
        Split into Two Hands: \`split\`    
      `,
    },
    {
      name: 'Roulette',
      value: stripIndent`
        Start a game of roulette, or place your bet in an existing game.
        \`roulette <bet> <space>\` \`roulette-info\`
        Example: \`!roulette 100 odd\` \`!roulette 100 3rd\` \`!roulette 100 13-24\` \`!roulette 16\`
      `,
    },
    {
      name: 'Russian Roulette',
      value: stripIndent`
        Play a game of Russian Roulette.
        \`russian-roulette <bet>\` | Example: \`!russian-roulette 100\`
      `,
    },
    {
      name: 'Slot Machine',
      value: stripIndent`
        Bet on the slot machine; If you get three in a row on the middle row, you win!
        \`slot-machine <bet>\` | Example: \`!slot-machine 100\`
      `,
    },
  ],
});

export const bc4 = new MessageEmbed({
  title: '🔨 | Tools and Utilities',
  color: '#F1D8F7',
  fields: [
    { name: 'Calculator', value: '`calc/c/caluclate`\nExample: `-c 2+2`' },
    { name: 'Time', value: '`currentTime/ctime/gettime`\nExample: `-ctime GMT+1` `-ctime Tokyo` `-ctime Pacific`' },
    {
      name: 'Set your Time Zone',
      value: '`settimezone/setz/tzset`\nExample: `-setz United Kingdom` Use your country!',
    },
    { name: 'Create a Poll', value: '`poll`\nExample: `-poll EP? HHF TIKnK IICE`' },
    {
      name: 'Schedule a Reminder',
      value:
        '`remindme`\nExample: `-remindme in 2 hours to fishy` `-remindme on 2020/12/31 00:00:00 to think of a resolution`',
    },
    { name: 'Translator', value: '`translate`\nExample: `-translate en/ja hedgehog` `-translate ja/en 針鼠`' },
    { name: 'Define Something', value: '`define`\nExample: `-define hedgehog`' },
  ],
});

export const bc5 = new MessageEmbed({
  title: '🎉 | Fun and Games',
  color: '#F1D8F7',
  fields: [
    { name: 'Define Something Using Urban Dictionary', value: '`urban`\nExample: `-urban ZUTOMAYO`' },
    { name: 'Find Out the Weather Forecast', value: '`weather`\nExample: `-weather London`' },
    { name: 'Find Out a Cat Fact', value: '`catfact/cf/cat/catfacts`' },
    { name: 'Find Out a Dog Fact', value: '`dogfact/dog/dogfacts`' },
    { name: 'Ask for Advice', value: '`advice`' },
    { name: 'Throw Something', value: '`throw`' },
    {
      name: 'Roll a Die',
      value: '`roll`\nSpecify nothing for 6 sides, specify a number for max sides, or use RPG syntax.',
    },
    { name: 'Would You Rather...?', value: '`wouldyourather/wyr`\nGet presented with two options.' },
    { name: 'Ask the 8-Ball', value: '`8ball`\nExample: `-8ball Will I get to see ZUTOMAYO live?`' },
  ],
});

export const bc6 = new MessageEmbed({
  color: '#F1D8F7',
  fields: [
    { name: 'Ask WolframAlpha', value: '`wolfram`\nExample: `-wolfram Tell me a joke`' },
    {
      name: 'Take a Typing Test',
      value:
        '`typing test/typing race`\nExample: `-typing test English 20` *20* refers to the amount of words to be used.',
    },
    { name: 'Turn Text into ASCII Art', value: '`ascii`\nExample: `-ascii ZUTOMAYO`' },
    { name: 'Pick Between Options', value: '`choose`\nExample: `-choose Nira-chan or Uniguri`' },
    { name: 'Ship Two People Together', value: '`ship`\nExample: `-ship @Jpshum#6969 and @daradara#1456`' },
    {
      name: 'Get Your Horoscope',
      value: '`horoscope/horoscope set`\nExample: `-horoscope set Aquarius` `-horoscope tomorrow`',
    },
    { name: 'Clap👏Between👏Messages👏Like👏So', value: '`clap`\nExample: `-clap Z U T O M A Y O`' },
    { name: 'Hug Someone or Something', value: '`hug`\nExample: `-hug ACAね` `-hug @Nira-chan#7874`' },
  ],
});

export const bc7 = new MessageEmbed({
  title: '🎧 | Last.fm',
  color: '#F1D8F7',
  description: 'Connect your [Last.fm](https://www.last.fm/) account to track and compare your listening history!',
  fields: [
    { name: 'Connect Your Account', value: '`fm set`\nExample: `fm set anomalilies`' },
    {
      name: 'Check Your Top Lists',
      value:
        '`fm toptracks/fm topartists/fm topalbums`\nExample: `-fm toptracks day` `-fm topartists week` `-fm topalbums alltime`',
    },
    { name: "Share the Song You're Currently Listening To", value: '`fm nowplaying/fm np`' },
    { name: 'Share Your Recent Tracks', value: '`fm recent`' },
    { name: 'See Who Else Knows a Particular Artist', value: '`whoknows/wk`\nExample: `-whoknows ZUTOMAYO`' },
    {
      name: 'See Who Else Has Listened to a Particular Song',
      value: '`whoknowstrack/wkt`\nExample: `-wkt Ham | ZUTOMAYO`',
    },
    {
      name: 'See Who Else Has Listened to a Particular Album',
      value: '`whoknowsalbum/wka`\nExample: `-wka 潜潜話 | ZUTOMAYO`',
    },
    { name: 'List Your Artist Crowns', value: '`crowns`\nThe top listener of a particular artist will gain a crown!' },
    { name: 'See What the Server is Currently Playing', value: '`fm servernp`' },
    { name: 'Unlink your Last.fm Account', value: '`fm unset`' },
  ],
});

export const bc8 = new MessageEmbed({
  title: '🎵 | Music',
  description: stripIndent`
    These commands will only work if you are in a voice channel!
    Spotify, Apple Music, and YouTube links are all supported!
  `,
  color: '#F1D8F7',
  fields: [
    {
      name: 'Add a Song to the Queue',
      value: '`play/p`\nExample: `-play https://youtu.be/ouLndhBRL4w` `-p Ham ZUTOMAYO`',
    },
    { name: 'Display the Queue', value: '`queue`' },
    { name: 'Skip to Next Song in Queue', value: '`next/skip`' },
    { name: 'Play the Previous Song', value: '`back/prev`' },
    { name: 'Jump to a Specified Track', value: '`jump/j`\nExample: `-jump Ham` `-j 3`' },
    { name: 'Shuffle the Queue', value: '`shuffle`' },
    { name: 'Clear the Queue', value: '`clear`' },
    { name: 'Play an Attached File', value: '`playfile/pf`' },
    { name: 'Add Bot to the VC', value: '`join/j`' },
    {
      name: 'Use the Soundboard',
      value: 'Available sounds can be found using: `soundboard`\nTo play a sound, use `sb [name]`\nExample: `-sb bruh`',
    },
  ],
});

export const bc9 = new MessageEmbed({
  title: '🏆 | Statistics and Leaderboards',
  color: '#F1D8F7',
  fields: [
    { name: 'Crowns', value: '`leaderboard crowns`' },
    { name: 'Typing', value: '`leaderboard wpm`' },
    { name: 'Typing Statistics', value: '`typing stats`' },
  ],
});

export const bc10 = new MessageEmbed({
  title: 'Celebrate Your Birthday With the Server!',
  color: '#99AAB5',
  description: oneLine`
    Our <@656621136808902656> allows us to celebrate our user's birthdays!\n
    If you'd like to set up your birthday with the bot, you can do so using the
    following command in <#742550881911701615>: \`bday set\`
  `,
});
