import i18next from "i18next"
import type { Command } from "../command"
import { execute } from "./handler"
import { ApplicationCommandType, Locale } from "discord.js"

export const suggestCommand: Command = {
  type: ApplicationCommandType.ChatInput,
  name: i18next.t("commands.suggest.name", {
    lng: Locale.EnglishGB,
  }),
  description: i18next.t("commands.suggest.description", {
    lng: Locale.EnglishGB,
  }),
  nameLocalizations: {
    [Locale.Dutch]: i18next.t("commands.suggest.name", {
      lng: Locale.Dutch,
    }),
  },
  descriptionLocalizations: {
    [Locale.Dutch]: i18next.t("commands.suggest.description", {
      lng: Locale.Dutch,
    }),
  },
  execute,
}
