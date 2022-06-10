import type { Client } from "discord.js"
import { logger } from "../logger"

export const readyEvent = async (client: Client<true>) => {
  // Using dynamic import to make sure translations are available
  const commands = await import("../commands")
  await client.application.commands.set(Object.values(commands))
  logger.info(`🚀 Deployed ${Object.values(commands).length} commands.`)
  logger.info(
    `👂 Listening to the following events: ${client.eventNames().join(", ")}`
  )
  logger.info(
    `🤖 ${client.user.username} is ready and active in ${client.guilds.cache.size} guilds.`
  )
}
