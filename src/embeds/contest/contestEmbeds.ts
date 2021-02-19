import { oneLine, stripIndent } from 'common-tags';
import { MessageEmbed } from 'discord.js';

import { emojis } from '../../config/config.json';

export const contest1 = new MessageEmbed({
  title: 'ZUTOMAYO ZONE - Monthly Contest #3',
  color: '#F1D8F7',
  description: oneLine`
    Sorry for the delay, everyone, but our 3rd competition is finally here!\n
    This time, instead of solely art entries, we're offering physical prizes this time around
    for a whole range of possible entry options.\n\n
    Please note this is probably a one-off for now as celebration of the release of *Gusare*,
    but we're planning more prizes for the future!\n
    If you'd like to help out with contest prizes financially or otherwise, feel free to DM
    <@228880116699103232> or <@126355183608397825>, or donate **__[here](https://ko-fi.com/uniguri)__**!\n
    ${emojis.spacer}
  `,
  fields: [
    {
      name: 'What does ZUTOMAYO mean to you?',
      value: oneLine`
        You've probably already guessed the theme of this contest from the subheader above,
        and as such, our monthly contest has expanded from having a sole focus on art, to
        allowing a ton of potential options to its entrants.\n
        Whether you still want to focus on drawing, make a cover of a previous song, or write
        a whole thesis on ZUTOMAYO lore, the possibilities are ~~somewhat~~ endless!\n
        ${emojis.spacer}
      `,
    },
    {
      name: 'How Do I Take Part?',
      value: oneLine`
        <#761326959154167838> been especially created to host server competitions!\n
        After you have verified that you have read the contest's rules below, ask any
        questions you may have, and ask for constructive criticism.\n\n
        However, **things will be a bit different for entries themselves this time around**.\n
        Whilst you can still post your entries in this aforementioned channel, you'll have
        to formally submit your entries on Google Forms.\n
        This makes it much easier for me (<@228880116699103232>) to organise voting, and
        allow people to take part in all categories as many times as they'd like.\n
        Further information can be found in the **__[Google Form](https://forms.gle/rLTpuoyrofgz1x6c8)__** itself.
      `,
    },
  ],
});

export const contest2 = new MessageEmbed({
  color: '#F1D8F7',
  fields: [
    {
      name: 'Category #1: Art',
      value: oneLine`
        With our contest theme this month being so broad, you can really draw whatever you'd like,
        as long as it relates to ZUTOMAYO and/or the ZONE in some way.\n
        Lost on where to even start? Try using one of these prompts: What does ZUTOMAYO mean to you?;
        What's your favourite song, who's your favourite Nira, which MV do you love the most, etc...?\n
        Any and all mediums will be accepted, however please make sure the quality is
        high enough (960x540 __minimum__) to be used as our server banner for the month if you win!
      `,
    },
    {
      name: 'Category #2: Music',
      value: oneLine`
        Whether you're a cover artist with a stunning voice, or a prodigy with skill in any instrument,
        we'd love to see your takes on ZUTOMAYO's work!\n
        Please submit your entry as either a video or audio file that you're happy with others hearing,
        as all our contests are judged by our server's members themselves!
      `,
    },
    {
      name: 'Category #3: Writing',
      value: oneLine`
        The most broad category in our already-broad theme; The writing category of our contest
        entails reviews, theories, translations, fanfiction, and even coding!\n
        Now's the time to prove yourself as a true master of ZUTOMAYO lore
        (maybe even using your own translations), a respectable stan capable of writing a
        review fit for a music magazine (which you can even film, if you'd like!),
        an author with a best-selling angsty Grey x Nira fanfic, or even one
        of <@740606402330099752>'s developers by writing a new feature you'd think would be perfect
        for the ZONE (using js)!\n
        Just remember to note that entries for this category must be provided as a link to
        a public/unlisted file, such as a PDF, or .txt file hosted online.
      `,
    },
  ],
});

export const contest3 = new MessageEmbed({
  title: 'Rules and Regulations',
  description: 'By joining this contest, you hereby agree to have read the following rules and regulations;',
  color: '#F1D8F7',
  fields: [
    {
      name: 'Plaigarism',
      value: oneLine`
        Any form of plaigarism, such as direct tracing for art entries, or even submitting
        straight-up stolen work for any of the categories will result in immediate disqualification.
      `,
    },
    {
      name: 'Restrictions',
      value: oneLine`
        We'd prefer original entries made solely for this contest, but there is no restriction on
        art previously created/entered into other competitions.
      `,
    },
  ],
});

export const contest4 = new MessageEmbed({
  color: '#F1D8F7',
  fields: [
    {
      name: 'When is the Deadline?',
      value: oneLine`
        The deadline for all entries will be on Saturday 20th February, 00:00 GMT/UTC.\n
        The rest of the 20th, up until 00:00 on the 21st, will be dedicated to voting, where
        the top 3 entries in each category will be brought into a final vote to decide the
        final placement of entrants.\n
        Winners will be released by/on Monday the 22nd of February, with prizes hopefully
        shipping out/provided A.S.A.P. after.
      `,
    },
  ],
});

export const contest5 = new MessageEmbed({
  color: '#F1D8F7',
  description: oneLine`
    Regardless of your place in the final 3 if you are a shortlisted runner-up in the art category,
    your art will still be featured as February-March's server banner!
  `,
  footer: {
    text: oneLine`
      *Ideally, we'd love to give prizes to those who haven't already bought Gusare.
      If you win and already have the physical album, you'll be given the chance to pass
      your prize down to any of our runners-up, however this is fully your choice, and will
      not be shared with the rest of the server.\n\n
      Shipped from the U.K.: Free economy shipping up to £6.50.\n
      Custom charges and tax not included; Search 'Royal Mail' for more information on 
      estimated shipping fees and restrictions!
    `,
  },
  fields: [
    {
      name: '1st Place',
      value: stripIndent`
        • Gusare standard edition CD.*
        • Gusare [limited edition case](https://www.instagram.com/p/CIVmZH9jG5q/), with a few extra goodies inside!*
        • 1,000,000${emojis.uniguri}.
        • A shiny new <@&761383548476325888> role.
      `,
    },
    {
      name: '2nd Place',
      value: stripIndent`
        • 3 months Spotify Premium.
        • 750,000${emojis.uniguri}.
        • The shiny <@&761383550741643284> role.
      `,
    },
    {
      name: '3rd Place',
      value: stripIndent`
        • 1 month Spotify Premium.
        • 250,000${emojis.uniguri}.
        • The shiny <@&761383550741643284> role.
      `,
    },
    {
      name: 'Participation Awards',
      value: stripIndent`
        • 50,000${emojis.uniguri}.
        • The <@&770792091353743401> role!
      `,
    },
  ],
});
