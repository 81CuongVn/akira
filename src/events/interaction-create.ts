import {
  AnyInteraction,
  ApplicationCommandType,
  InteractionType,
} from "discord.js"
import i18next from "i18next"
import { checkConditions } from "../commands/conditions"
import { logger } from "../logger"

export const interactionCreateEvent = async (interaction: AnyInteraction) => {
  if (
    interaction.type !== InteractionType.ApplicationCommand ||
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
    interaction.isChatInputCommand() &&
    command.type === ApplicationCommandType.ChatInput

  const isContextMenuCommand =
    interaction.isContextMenuCommand() &&
    (command.type === ApplicationCommandType.Message ||
      command.type === ApplicationCommandType.User)

  try {
    if (isSlashCommand) {
      if (command.conditions) {
        const allConditionsMet = await checkConditions(
          command.conditions,
          interaction
        )

        if (allConditionsMet) {
          await command.execute(interaction, interaction.locale)
        } else {
          await interaction.reply(
            i18next.t("common.condition_failed", {
              lng: interaction.locale,
            })
          )
        }
      } else {
        await command.execute(interaction, interaction.locale)
      }
    } else if (isContextMenuCommand) {
      if (command.conditions) {
        const allConditionsMet = await checkConditions(
          command.conditions,
          interaction
        )

        if (allConditionsMet) {
          await command.execute(interaction, interaction.locale)
        } else {
          await interaction.reply(
            i18next.t("common.condition_failed", {
              lng: interaction.locale,
            })
          )
        }
      } else {
        await command.execute(interaction, interaction.locale)
      }
    }
  } catch (error) {
    // TODO: Improve error handling when possible: https://github.com/discordjs/discord.js/pull/8068
    if (error instanceof Error) {
      logger.error("Command failed: %s", command.name)
      logger.error(error, error.message)
    }
  }
}
