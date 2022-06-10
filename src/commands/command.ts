import type { Locale } from "discord-api-types/v10"
import type {
  ApplicationCommandData,
  BaseCommandInteraction,
  ChatInputApplicationCommandData,
  CommandInteraction,
  ContextMenuInteraction,
  MessageApplicationCommandData,
  UserApplicationCommandData,
} from "discord.js"

export type CommandCondition = (
  interaction: CommandInteraction<"cached">
) => Promise<boolean>

type ApplicationCommandBase<T extends BaseCommandInteraction> =
  ApplicationCommandData & {
    conditions?: CommandCondition[]
    execute(interaction: T, locale: Locale): Promise<unknown>
  }

type ContextMenuCommand = ApplicationCommandBase<
  ContextMenuInteraction<"cached">
> &
  (UserApplicationCommandData | MessageApplicationCommandData)

type SlashCommand = ApplicationCommandBase<CommandInteraction<"cached">> &
  ChatInputApplicationCommandData

export type Command = ContextMenuCommand | SlashCommand
