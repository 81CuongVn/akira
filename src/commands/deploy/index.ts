import { Locale } from "discord-api-types/v10"
import i18next from "i18next"
import type { Command } from "../command"
import { conditions } from "../conditions"
import { execute } from "./handler"

export const deployCommand: Command = {
  type: "CHAT_INPUT",
  name: i18next.t("commands.deploy.name", {
    lng: Locale.EnglishGB,
  }),
  description: i18next.t("commands.deploy.description", {
    lng: Locale.EnglishGB,
  }),
  nameLocalizations: {
    [Locale.Dutch]: i18next.t("commands.deploy.name", {
      lng: Locale.Dutch,
    }),
  },
  descriptionLocalizations: {
    [Locale.Dutch]: i18next.t("commands.deploy.description", {
      lng: Locale.Dutch,
    }),
  },
  conditions: [conditions.isBotOwner],
  execute,
}
