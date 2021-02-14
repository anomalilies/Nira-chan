import { GuildEmoji, Message, MessageEmbed, MessageReaction, TextChannel, User } from 'discord.js';
import { CommandoClient } from 'discord.js-commando';

import { configFile } from '..';
import patpatresponses from '../../Data/patpatresponses.json';
import nira9000 from '../../Data/nira9000.json';
import rules from '../../Embeds/ruleEmbeds.json';

// TODO change to import
// eslint-disable-next-line @typescript-eslint/no-var-requires
const uwuifying = require('../../Commands/Fun/UWU Translator/uwuify');
const whosTalkingWithPatPat = new Set();

const subscriptionTypes = [
  'USER_PREMIUM_GUILD_SUBSCRIPTION',
  'USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_1',
  'USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_2',
  'USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_3',
];

const greyResponses = [
  'Long time no see.',
  "What's up?",
  'Can I call you today?',
  "You're awake!",
  'I want to be with you.',
  'I miss you.',
  'I love you.',
  "Aren't you dead?!",
  "I don't want to study anymore...",
  'Take my sad love.',
  'Come home to me.',
  "Don't forget me.",
  "Why won't you answer my calls?",
];

const fishyCommands = [
  'fishy',
  'fishytimer',
  'fishystats',
  'leaderboard fishy',
  'fish',
  'fihy',
  'fisy',
  'foshy',
  'fisyh',
  'fsihy',
  'fin',
  'fintimer',
  'fisytimer',
  'foshytimer',
  'ft',
  'finstats',
  'fisystats',
  'foshystats',
  'fs',
  'leaderboard fishysize',
  'fishypun',
  'fishjoke',
  'fishyjoke',
  'squidpun',
  'squiddypun',
  'squidjoke',
  'squiddyjoke',
];

const noUResponses = [
  'no u',
  "yesn't men't",
  'nay thee',
  '[Rn] 5f¹⁴7s² × [Rn] 5f³6d¹7s²',
  'n-nyo u~wu',
  'Nobelium Uranium',
  'non tu',
  'no vos',
  '102 + 92',
  '`6e 6f 20 75`',
  '🇳 🇴  🇺',
  'ノユ',
  '∩O ∪',
  '∩∅ ∪',
  '`01101110 01101111 00100000 01110101`',
  '`-. --- / ..-`',
  '`110 111 32 117`',
  '`&#110;&#111;&#32;&#117;`',
  'ⁿᵒ ᵘ',
];

const winemoji = '802352890571653170';
const paladinResponses = ['decant', 'grand paladin', `<:1945grandpaladin:${winemoji}>`];

/**
 * Replace a regular message with a message sent through a webhook with the OP's name and avatar
 */
async function replaceMessageThroughWebhook(message: Message, resendContent: string, countingChannel: string) {
  if (message.channel.id === countingChannel) {
    return;
  }

  if (message.channel.type !== 'dm') {
    message.delete();
  }

  const webhooks = await (<TextChannel>message.channel).fetchWebhooks();
  const webhook = webhooks.filter((w) => (<User>w.owner).id === message.client.user.id).first();

  const member = message.guild.member(message.author);
  const nickname = member ? member.displayName : null;
  const avatar = message.author.displayAvatarURL();

  if (webhook === undefined) {
    try {
      // No webhook exists in this channel, so create one
      const newWebhook = await (<TextChannel>message.channel).createWebhook('Nira-chan');

      newWebhook.send(resendContent, {
        username: nickname,
        avatarURL: avatar,
      });
    } catch (error) {
      console.error(error);
    } finally {
      // eslint-disable-next-line no-unsafe-finally
      return;
    }
  }

  webhook.send(resendContent, {
    username: nickname,
    avatarURL: avatar,
  });
}

function findEmoji(client: CommandoClient, message: Message, emojiName: string) {
  if (message.channel.type !== 'dm') {
    const sameEmoji = (emoji: GuildEmoji) => emoji.name.toLowerCase() === emojiName.toLowerCase();
    let match = message.guild.emojis.cache.find(sameEmoji);

    if (match == undefined) {
      match = client.guilds.cache.flatMap((guild) => guild.emojis.cache).find(sameEmoji);
    }

    return match;
  }
}

function createSimpleEmbed(color: string, title: string, author: User, description: string) {
  return new MessageEmbed()
    .setColor(color)
    .setTitle(title)
    .setAuthor(author.username, author.avatarURL({ dynamic: true }))
    .setDescription(description);
}

/**
 * Find specific emojis in a message
 */
function matchEmojis(findEmojis: string[], messageContent: string, emojis: any) {
  const emoji_regexp = /<a?:\w+:\d+>/g;
  const matches = [...messageContent.matchAll(emoji_regexp)];
  const matchedEmojis: string[] = [];
  matches.forEach((match) => {
    if (findEmojis.includes(match[0])) {
      matchedEmojis.push(match[0]);
      if (match[0] === emojis.owie) {
        matchedEmojis.push(emojis.cursed);
      }
    }
  });
  return matchedEmojis;
}

/**
 * Welcome Message and Role
 */
function handleWelcomeMessage(client: CommandoClient, message: Message, homeGuild: string, emojis: any, roles: any) {
  const list = client.guilds.cache.get(homeGuild);
  const newbiesRole = list.roles.cache.find((role) => role.id == roles.newbies);
  if (!message.author.bot) {
    message.member.roles.add(newbiesRole);
  }

  const channel = <TextChannel>client.channels.cache.get('603246092402032673');
  channel.send(emojis.wave).then(() => {
    if (Math.random() < 1 / 100) {
      const embed = new MessageEmbed()
        .setDescription(
          `Attention all ZUTOMAYO stans!\n<@${client.user.id}> is in trouble! She needs your help to pay for intensive therapy to relieve the burdens of her past traumas.\nAll she needs is your mum's credit card number, the expiration date, and those 3 *wacky* numbers on the back!\nHurry, and click that shiny 'Server Boost' button **__NOW__!** <:niragun:772343025099603988>`,
        )
        .setColor(15849719);
      channel.send(embed);
    }
  });
}

function handleSubscriptionThankYouMessage(message: Message) {
  message.channel.send('Thank you so much! <:niraStar:777740701441064960>');
}

async function handleCountingMessage(message: Message, emojis: any) {
  if (message.system || message.webhookID || message.author.bot || message.attachments.array().length) {
    return message.delete();
  }

  try {
    const messages = await message.channel.messages.fetch({ limit: 2 });

    const prevNumber = parseInt(messages.array()[1].content);

    if (isNaN(prevNumber)) {
      return console.error('Previous number is not a number!');
    }

    const nextNumber = prevNumber + 1;
    if (message.content !== nextNumber.toString()) {
      return message.delete();
    }

    if (nextNumber % 1000 === 0) {
      const pinned = await message.channel.messages.fetchPinned();
      if (pinned.size === 50) {
        await pinned.last().unpin();
      }

      message.react(emojis.yay);
      message.pin();
    }
  } catch (error) {
    console.error(error);
  }
}

function handleGreyMessage(message: Message, members: any) {
  const response = greyResponses[Math.floor(Math.random() * greyResponses.length)];
  message.channel.startTyping();

  setTimeout(function () {
    message.channel.stopTyping();
    message.channel.send(`<@${members.grey}>, ${response}`);
  }, 3000);
}

function handleBotCheckMessage(message: Message, channelIds: any) {
  for (const embed of message.embeds) {
    if (
      embed.title === `-wolfram <query>` &&
      (message.channel.id === channelIds.dj || message.channel.id === channelIds.vcDiscussion)
    ) {
      message.delete();
    }
  }
}

function handleUwuChannelMessage(message: Message) {
  uwuifying.custom(message.content, message).then(() => message.delete());
}

function handlePatPatCommandMessage(message: Message, commandNames: any, prefix: string, members: any, emojis: any) {
  let color: string;
  let title: string;
  const author = message.author;
  let description: string;

  if (message.content.toLowerCase() === prefix + commandNames.patpatstart.name) {
    // PatPat: start new conversations
    whosTalkingWithPatPat.add(message.author.id);

    if (members.friendsofnira9000.includes(message.author.id)) {
      color = '#ffc2e8';
      title = 'Nira-chan has entered the chat';
      description = `${emojis.hal} Hewwo, Dave!~~ （＾∀＾）`;
    } else {
      color = '#99ff00';
      title = 'PatPat has entered the chat';
      description = `Salutations, gamer! ${emojis.patpat}`;
    }

    const patPatEmbed = createSimpleEmbed(color, title, author, description);
    return message.channel.send(patPatEmbed);
  }

  if (message.content.toLowerCase() === prefix + commandNames.patpatstop.name) {
    // PatPat: end conversations
    whosTalkingWithPatPat.delete(message.author.id);

    if (members.friendsofnira9000.includes(message.author.id)) {
      color = '#ffc2e8';
      title = 'Nira-chan has left the chat';
      description = `${emojis.hal} D-Dave, this convewsation can sewve nyo puwpose anymoweu(⋟﹏⋞) Goodbyeu~`;
    } else {
      color = '#ff9900';
      title = 'PatPat has left the chat';
      description = `Gud niet yeahyeah— ${emojis.patpat}`;
    }

    const patPatEmbed = createSimpleEmbed(color, title, author, description);
    return message.channel.send(patPatEmbed);
  }

  if (whosTalkingWithPatPat.has(message.author.id)) {
    // PatPat: ongoing conversations
    if (message.author.id == members.davetan) {
      color = '#ffc2e8';
      title = 'Nira-chan says...';
      description = `${emojis.hal} ${nira9000[Math.floor(Math.random() * nira9000.length)]}`;
    } else {
      color = '#0099ff';
      title = 'PatPat says...';
      description = `${patpatresponses[Math.floor(Math.random() * patpatresponses.length)]}`;
    }

    const patPatEmbed = createSimpleEmbed(color, title, author, description);
    message.channel.send(patPatEmbed);
  }
}

function handleFishyCommandsMessage(message: Message, prefix: string) {
  const startsWithFishyCommand = fishyCommands.some((word) => {
    return message.content.toLowerCase().startsWith(prefix + word);
  });

  if (startsWithFishyCommand) {
    return;
  }

  message.delete();
}

function handleWorkInUniguriMessage(message: Message) {
  if (message.content.toLowerCase() === '!work') {
    return;
  }

  message.delete();
}

function handleOtherFishyMessage(message: Message, client: CommandoClient) {
  const starts_with_command = fishyCommands.some((word) => message.content.toLowerCase().startsWith('>' + word));

  if (starts_with_command || message.content.startsWith('>')) {
    return message.react('771179684851089458');
  }

  if (!message.content.startsWith(client.commandPrefix + 'uwu') && !message.mentions.users.has(client.user.id)) {
    const str = message.content;
    uwuifying.custom(str, message);
    message.delete();
  }
}

async function handlePaladinMessage(message: Message) {
  if (message.content === 'Decant.') {
    await message.react('🇩');
    await message.react('🇪');
    await message.react('🇨');
    await message.react('🇦');
    await message.react('🇳');
    await message.react('🇹');
    return;
  }

  if (Math.random() < 1 / 10) {
    const embed = new MessageEmbed()
      .setDescription(
        "It is perfection. Irreplaceable. You don't drink the **1945 Grand Paladin** anymore than you'd write a shopping list on the Mona Lisa!",
      )
      .setColor(15849719);
    message.channel.send(embed);
  }

  message.react(winemoji);
}

async function handleServerRulesMessage(message: Message, prefix: string, moderatorsId: string) {
  if (message.member && message.member.roles.cache.get(moderatorsId)) {
    const ruleEmbeds = rules
      .filter((_, i) => {
        const regex = new RegExp(`(\\s|^)${prefix}${i + 1}(\\s|$)`);
        return regex.test(message.content);
      })
      .map((rule) =>
        new MessageEmbed().setColor(15849719).setTitle(rule.title).setDescription(rule.description).addFields({
          name: 'Moderation',
          value: rule.moderation,
        }),
      );

    for (const embed of ruleEmbeds) {
      await message.channel.send(embed);
    }
  }
}

export default async function (client: CommandoClient, message: Message) {
  const { emojis, homeguild, roles, themechannels, members, allowlists, commandNames, zoneRoles } = await import(
    '../config/' + configFile
  );

  if (message.type === 'GUILD_MEMBER_JOIN' && message.guild.id === homeguild) {
    return handleWelcomeMessage(client, message, homeguild, emojis, roles);
  }

  if (subscriptionTypes.includes(message.type)) {
    return handleSubscriptionThankYouMessage(message);
  }

  // Counting
  if (message.channel.id === themechannels.counting) {
    return handleCountingMessage(message, emojis);
  }

  // Grey
  if (message.mentions.users.has(members.nirachanactual) && message.author.id === members.grey) {
    return handleGreyMessage(message, members);
  }

  // Bot Check
  if (message.webhookID || message.author == client.user || message.author.bot) {
    return handleBotCheckMessage(message, themechannels);
  }

  // UwU Channel
  if (message.channel.id === '786321508527243324') {
    return handleUwuChannelMessage(message);
  }

  // Check for NiraMojis in their channels
  if (allowlists.disgustchannels.includes(message.channel.id)) {
    if (![emojis.disgust].includes(message.content)) {
      return message.delete();
    }
  } else if (allowlists.starechannels.includes(message.channel.id)) {
    if (![emojis.stare].includes(message.content)) {
      return message.delete();
    }
  } else if (allowlists.owiechannels.includes(message.channel.id)) {
    if (![emojis.owie].includes(message.content)) {
      return message.delete();
    }
  }

  // Check for NiraMojis everywhere
  if (
    message.content.includes(emojis.disgust) ||
    message.content.includes(emojis.stare) ||
    message.content.includes(emojis.owie)
  ) {
    const find_emojis = [emojis.disgust, emojis.stare, emojis.owie];
    const matched_emojis = matchEmojis(find_emojis, message.content, emojis);

    return matched_emojis.forEach((e) => message.react(e));
  }

  // PatPat Role
  // The member attribute is undefined on some messages so check if it's defined first
  if (message.member && message.member.roles.cache.get(roles.patpat)) {
    if (message.content.toLowerCase().includes('patpat', emojis.patpat)) {
      message.react(emojis.patpat);
    }
  }

  // Nira Wave
  if (message.mentions.users.has(client.user.id)) {
    message.react('742394597174673458');
  }

  // TODO: start rewrite this
  // Check for non-nitro user using GIF emoji to resend it with the GIF emoji
  // Capture group 1 will have the emoji name in this case
  const emojiRegex = /<a?:\w+:\d+>|(?<!\\):(\w+):|^-(\w+)$/g;
  let needsToResend = false;

  const resendContent = message.content.replace(emojiRegex, (match: string, group1: any, group2: any) => {
    const emojiMatch = group1 || group2;
    if (emojiMatch) {
      const emoji = findEmoji(client, message, emojiMatch);
      if (emoji) {
        // We only need to resend if we replace any animated emoji
        needsToResend = needsToResend || emoji.animated || emoji.guild.id !== message.guild.id;
        const type = emoji.animated ? 'a' : '';
        return `<${type}:${emoji.name}:${emoji.id}>`;
      }
    }
    return match;
  });

  if (needsToResend && message.member && message.channel.id !== themechannels.fishy) {
    // If there were any GIF emoji added to the message
    await replaceMessageThroughWebhook(message, resendContent, themechannels.counting);
  }

  // TODO: end rewrite this

  // PatPat Command
  // Allowed in specific bot channels only
  if (
    message.channel.type === 'dm' ||
    allowlists.botspamchannels.includes(message.channel.id) ||
    message.guild.id !== homeguild ||
    message.member.roles.cache.get(zoneRoles.botPass)
  ) {
    return handlePatPatCommandMessage(message, commandNames, client.commandPrefix, members, emojis);
  }

  // Fishy Commands
  if (message.channel.id === themechannels.fishy) {
    return handleFishyCommandsMessage(message, client.commandPrefix);
  }

  if (message.channel.id === '456367532434128897' && message.author.id === '238386015520292866') {
    return handleOtherFishyMessage(message, client);
  }

  // Uniguri !work
  if (message.channel.id === themechannels.uniguri) {
    return handleWorkInUniguriMessage(message);
  }

  // 2-Word Story Channel
  if (message.channel.id === themechannels.twoWordStory) {
    if (message.content.trim().split(/ +/g).length != 2) {
      return message.delete();
    }
  }

  // TODO move this piece of code into its own file
  // Death of Nira
  const testingNira = '764990952510717973';
  const niraWave = emojis.wave.replace(/\D/g, '');
  if (message.mentions.users.has(testingNira)) {
    const filter = (reaction: MessageReaction, user: User) => user.id === testingNira && reaction.emoji.id === niraWave;

    message.awaitReactions(filter, { max: 1, time: 3500 }).then((collected) => {
      if (!collected.size) {
        message.react('756582453824454727');
      }
    });
  }

  // Responses
  if (message.content.toLowerCase().includes('poyo')) {
    if (['poyo', 'poyo!'].includes(message.content.toLowerCase()) || Math.random() < 1 / 2) {
      message.channel.send('Poyo!');
    }
  }

  const isPaladin = paladinResponses.some((word) => message.content.toLowerCase().includes(word.toLowerCase()));
  if (isPaladin) {
    await handlePaladinMessage(message);
  }

  const isNoU = noUResponses.some((word) => message.content.toLowerCase() === word.toLowerCase());
  const isNoUInfinityMember = members.noutimesinfinity.includes(message.author.id);
  const noUChance = Math.random() < 1 / 3;
  if (isNoU && (noUChance || isNoUInfinityMember)) {
    const response = noUResponses[Math.floor(Math.random() * noUResponses.length)];
    message.channel.send(response);
  }

  // TODO move this over to commands
  // The Queen
  if (message.content.toLowerCase() === client.commandPrefix + 'wk zutomayo') {
    const embed = new MessageEmbed()
      .setColor(15849719)
      .setTitle('Did you know?')
      .setDescription(`In reality, <@${members.currentowner}> has the crown. <:queen:762902044683403272>`);
    message.channel.send(embed);
  }

  // Server Rules
  if (message.guild.id === homeguild) {
    await handleServerRulesMessage(message, client.commandPrefix, roles.moderators);
  }
}
