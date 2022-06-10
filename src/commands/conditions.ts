import { config } from "../config"
import type { CommandCondition } from "./command"

const createConditions = <T extends Record<string, CommandCondition>>(
  conditions: T
) => conditions

export const conditions = createConditions({
  isBotOwner: async (interaction) => {
    return interaction.user.id === config.get("bot.ownerID")
  },
})
