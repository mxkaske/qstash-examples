export enum Integrations {
  SLACK = "slack",
  DISCORD = "discord",
}

const config = {
  name: "QStash Webhook Bot",
  url: "https://picsum.photos/200", // random image
};

export const notify = (integration: Integrations, text: string) => {
  switch (integration) {
    case Integrations.SLACK:
      return slackNotification(text);
    case Integrations.DISCORD:
      return discordNotification(text);
    default:
      const _exhaustiveCheck: never = integration;
      return _exhaustiveCheck;
  }
};

const slackNotification = (text: string) => {
  return fetch(process.env.SLACK_WEBHOOK!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: config.name,
      icon_url: config.url,
      text,
    }),
  });
};

const discordNotification = (content: string) => {
  return fetch(process.env.DISCORD_WEBHOOK!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: config.name,
      avatar_url: config.url,
      content,
    }),
  });
};
