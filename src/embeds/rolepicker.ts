import { stripIndent } from "common-tags";

export type Picker = {
  title: string;
  description: string;
  roles: Map<string, string>;
};

export const rolePickerData = [
  {
    title: "Pronouns",
    description: "React to give yourself a role.",
    roles: new Map<string, string>([
      ["<:niraHuff:755500124091973703>", "742068285553770529"],
      ["<:niraSigh:742130938468630659>", "742068282777141369"],
      ["<:niraSnrrk:750462152199897208>", "742068286719524865"],
      ["<:niraHuh:742104449660747908>", "772539432515534890"],
    ]),
  },
  {
    title: "Miscellaneous",
    description: "Get access to opt-in channels and all server notifications.",
    roles: new Map<string, string>([
      ["<:niraSad:742096993731477505>", "772657659635171348"],
      ["<:niraEyeroll:742096470462824468>", "986011266579578890"],
      ["<:niraScream:742090483446317107>", "753248752332046467"],
      ["<:nirritated:742090783913541732>", "820733048290410546"],
    ]),
  },
  {
    title: "Dividers",
    description: "Want to divide your roles? Claim your handy dividers here!",
    roles: new Map<string, string>([
      ["<:niraYay:764025729696268319>", "770127096194269225"],
      ["<:niraPeace:756742977971552286>", "770119715808477244"],
      ["<:niraPunch:764027219323912202>", "770310986275618827"],
      ["<:niraWink:764248315553775656>", "770310988938346526"],
      ["<:niraGross:764026501066129408>", "781322220382453780"],
      ["<:niraScoopYAY:777269746722668565>", "781322360967266344"],
    ]),
  },
  {
    title: "Colours",
    description: stripIndent`
      Want to change your role colour? You've come to the right place!\n
      **The highest role in the list below will become the colour for your username:**
      • If you'd like to add a role you don't already have, react with the corresponding emoji once.
      • If you'd like to remove a pre-existing role you already have, react with the corresponding emoji twice.
      • If you'd like to remove a given role, remove your reaction by reacting with the corresponding emoji again.
    `,
    roles: new Map<string, string>([
      ["<:red:781294389241970688>", "745380089457410192"],
      ["<:orange:781295090617811004>", "760695283871907841"],
      ["<:yellow:781295102046765066>", "760695285000831017"],
      ["<:green:783501246954340382>", "760695501447889016"],
      ["<:blue:781295124280901643>", "760695751499579504"],
      ["<:pink:781295137635958804>", "752308894474174515"],
    ]),
  },
];
