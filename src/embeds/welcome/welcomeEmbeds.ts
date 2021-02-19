import { oneLineTrim } from 'common-tags';
import { MessageEmbed } from 'discord.js';

export const welcome1 = new MessageEmbed({
  title: 'Welcome to ZUTOMAYO ZONE!',
  description: oneLineTrim`
    Thanks so much for joining us; It's an absolute pleasure to have you here!\n
    We're a pretty laidback server as a whole, however to combat spam, we require you 
    to have read the rules before chatting with us.\n
    Please follow Discord's built-in tutorial on how to do so!
  `,
  color: '#F1D8F7',
  fields: [
    {
      name: 'Moderation of Rules',
      value: oneLineTrim`
        **Please also note that Admins have the final say when it comes to the enforcement of *all* rules, 
        particularly if multiple have been broken.**\n
        We will always talk our actions through where possible, but if this isn’t an option, 
        we have __every right__ to choose how a problematic member is handled.\n
        Thank you for your understanding!\n\n
        **Can't see the rules?** Please react below with <:niranotes:756679974953549914> to gain 
        access to <#791126859320000522>, where you'll be able to check over our moderation policies.
      `,
    },
  ],
});

export const welcome2 = new MessageEmbed({
  color: '#F1D8F7',
  fields: [
    {
      name: 'What Should I Do Now?',
      value: oneLineTrim`
        • New to ZUTOMAYO? Find out more about the group on <#760625396487684126>!\n
        • Check out our collection of exclusive ZUTOMAYO content over at <#742069780328087613>!\n
        • Don't feel afraid introduce yourself over at <#603246092402032673>; We pride ourselves 
        on our friendly community, so we promise they won't bite.\n
        • Be sure to also familarise yourself with how the server is run on <#760621183564513312>, 
        and grab some roles from <#781296501351383050> whilst you're at it!\n
        • Starting a ZUTOMAYO collection, or looking to add to your shrine? We hold regular contests 
        on <#770795084002230292>, with prizes you're sure to be interested in!",
      `,
    },
    {
      name: 'Support Us',
      value: oneLineTrim`
        If you'd like to help fund our giveaways, **check out our __[Ko-fi](https://ko-fi.com/uniguri)__**!\n
        However, regardless of whether or not you choose to financially support us, please feel free to invite 
        your friends to the ZONE with the link below:
      `,
    },
  ],
});
