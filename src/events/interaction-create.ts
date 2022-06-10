import type { Locale } from "discord-api-types/v10"
import type { CacheType, Interaction } from "discord.js"
import i18next from "i18next"
import { logger } from "../logger"

export const interactionCreateEvent = async (
  interaction: Interaction<CacheType>
) => {
  if (
    (!interaction.isCommand() && !interaction.isContextMenu()) ||
    !interaction.inCachedGuild()
  ) {
    return
  }

  // Using dynamic import to make sure translations are available
  const commands = await import("../commands")

  const command = Object.values(commands).find(
    (command) => command.name === interaction.commandName
  )

  if (!command) {
    return
  }

  const isSlashCommand =
    interaction.isCommand() && command.type === "CHAT_INPUT"

  const isContextMenuCommand =
    interaction.isContextMenu() &&
    (command.type === "MESSAGE" || command.type === "USER")

  try {
    if (isSlashCommand) {
      if (command.conditions) {
        const conditionsResults = await Promise.all(
          command.conditions.map((condition) => condition(interaction))
        )
        const allConditionsMet = conditionsResults.every(
          (condition) => condition === true
        )

        if (allConditionsMet) {
          await command.execute(interaction, interaction.locale as Locale)
        } else {
          await interaction.reply(
            i18next.t("common.condition_failed", {
              lng: interaction.locale as Locale,
            })
          )
        }
      } else {
        await command.execute(interaction, interaction.locale as Locale)
      }
    } else if (isContextMenuCommand) {
      await command.execute(interaction, interaction.locale as Locale)
    }
  } catch (error) {
    if (error instanceof Error) {
      logger.error("Command failed: %s", command.name)
      logger.error(error, error.message)
    }
  }
}
