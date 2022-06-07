import { Client, Intents } from "discord.js"
import { config } from "./config"
import { logger } from "./logger"

const client = new Client({
  intents: [Intents.FLAGS.GUILDS],
})

client.once("ready", (client) =>
  logger.info(`${client.user.username} is online!`)
)

client.login(config.get("bot.token"))
