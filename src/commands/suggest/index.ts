import i18next from "i18next"
import type { Command } from "../command"
import { Locale } from "discord-api-types/v10"
import { execute } from "./handler"

export const suggestCommand: Command = {
  type: "CHAT_INPUT",
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
