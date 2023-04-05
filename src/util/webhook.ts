import { GuildTextBasedChannel, ThreadChannel } from "discord.js";

type WebhookChannel = Exclude<GuildTextBasedChannel, ThreadChannel>;

export async function getWebhook(channel: WebhookChannel) {
  const webhooks = await channel.fetchWebhooks();
  const webhook = webhooks.find((w) => w.token);

  if (webhook) {
    return webhook;
  } else {
    return channel.createWebhook({ name: "Nira-chan" });
  }
}
