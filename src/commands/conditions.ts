import type { CommandInteraction } from "discord.js"
import { config } from "../config"
import type { CommandCondition } from "./command"

const createConditions = <T extends Record<string, CommandCondition>>(
  conditions: T
) => conditions

export const checkConditions = async (
  conditions: CommandCondition[],
  interaction: CommandInteraction<"cached">
) => {
  const conditionsResults = await Promise.all(
    conditions.map((condition) => condition(interaction))
  )

  return conditionsResults.every((condition) => condition === true)
}

export const conditions = createConditions({
  isBotOwner: async (interaction) => {
    return interaction.user.id === config.get("bot.ownerID")
  },
})
