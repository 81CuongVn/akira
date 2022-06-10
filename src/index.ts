import { Client, Intents } from "discord.js"
import { config } from "./config"
import i18next from "i18next"
import Backend from "i18next-fs-backend"
import { Locale } from "discord-api-types/v10"
import { fileURLToPath, URL } from "node:url"
import * as events from "./events"

await i18next.use(Backend).init({
  preload: [Locale.EnglishGB, Locale.Dutch],
  backend: {
    loadPath: fileURLToPath(
      new URL("../locales/{{lng}}/{{ns}}.json", import.meta.url)
    ),
  },
})

new Client({ intents: [Intents.FLAGS.GUILDS] })
  .once("ready", events.readyEvent)
  .on("interactionCreate", events.interactionCreateEvent)
  .login(config.get("bot.token"))
