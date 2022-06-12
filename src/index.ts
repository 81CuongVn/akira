import { Client, IntentsBitField, Locale } from "discord.js"
import { config } from "./config"
import i18next from "i18next"
import Backend from "i18next-fs-backend"
import { fileURLToPath, URL } from "node:url"
import * as events from "./events"

await i18next.use(Backend).init({
  fallbackLng: Locale.EnglishGB,
  preload: [Locale.EnglishGB, Locale.Dutch],
  backend: {
    loadPath: fileURLToPath(
      new URL("../locales/{{lng}}/{{ns}}.json", import.meta.url)
    ),
  },
})

new Client({ intents: [IntentsBitField.Flags.Guilds] })
  .once("ready", events.readyEvent)
  .on("interactionCreate", events.interactionCreateEvent)
  .login(config.get("bot.token"))
