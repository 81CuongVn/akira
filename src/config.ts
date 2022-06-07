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
  },
})

if (config.get("env") !== "production") {
  await import("dotenv/config")
}

config.validate({ allowed: "strict" })
