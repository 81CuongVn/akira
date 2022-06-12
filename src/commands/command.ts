import type {
  ApplicationCommandData,
  ChatInputCommandInteraction,
  ChatInputApplicationCommandData,
  ContextMenuCommandInteraction,
  MessageApplicationCommandData,
  UserApplicationCommandData,
  Locale,
  Awaitable,
  CommandInteraction,
} from "discord.js"

export type CommandCondition = (
  interaction: CommandInteraction<"cached">
) => Promise<boolean>

type ApplicationCommandBase<
  T extends ChatInputCommandInteraction | ContextMenuCommandInteraction
> = ApplicationCommandData & {
  // * Conditions are checked at runtime.
  conditions?: CommandCondition[]
  execute(interaction: T, locale: Locale): Awaitable<void>
}

type ContextMenuCommand = ApplicationCommandBase<
  ContextMenuCommandInteraction<"cached">
> &
  (UserApplicationCommandData | MessageApplicationCommandData)

type SlashCommand = ApplicationCommandBase<
  ChatInputCommandInteraction<"cached">
> &
  ChatInputApplicationCommandData

export type Command = ContextMenuCommand | SlashCommand
