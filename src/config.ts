import convict from "convict"

export const config = convict({
  env: {
    doc: "The application environment.",
    format: ["production", "development"],
    default: "development",
    env: "NODE_ENV",
  },
  bot: {
    token: {
      doc: "The Discord bot application token.",
      format: "*",
      default: undefined,
      env: "DISCORD_TOKEN",
      sensitive: true,
    },
    ownerID: {
      doc: "ID of the Discord bot application owner.",
      format: "*",
      default: "405778045941841923",
      env: "DISCORD_BOT_OWNER",
    },
    testGuildID: {
      doc: "ID of the Discord bot application test server.",
      format: "*",
      default: "984898885166182430",
      env: "DISCORD_BOT_TEST_GUILD",
    },
    feedbackChannelID: {
      doc: "ID of the Discord bot application feedback channel.",
      format: "*",
      default: "984900634568445982",
      env: "DISCORD_BOT_FEEDBACK_CHANNEL",
    },
  },
})

if (config.get("env") !== "production") {
  await import("dotenv/config")
}

config.validate({ allowed: "strict" })
