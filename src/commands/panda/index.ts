import i18next from "i18next"
import type { Command } from "../command"
import { Locale } from "discord-api-types/v10"
import { execute } from "./handler"

export const pandaCommand: Command = {
  type: "CHAT_INPUT",
  name: i18next.t("commands.panda.name", {
    lng: Locale.EnglishGB,
  }),
  description: i18next.t("commands.panda.description", {
    lng: Locale.EnglishGB,
  }),
  nameLocalizations: {
    [Locale.Dutch]: i18next.t("commands.panda.name", {
      lng: Locale.Dutch,
    }),
  },
  descriptionLocalizations: {
    [Locale.Dutch]: i18next.t("commands.panda.description", {
      lng: Locale.Dutch,
    }),
  },
  options: [
    {
      type: "BOOLEAN",
      required: true,
      name: i18next.t("commands.panda.options.hide.name", {
        lng: Locale.EnglishGB,
      }),
      description: i18next.t("commands.panda.options.hide.description", {
        lng: Locale.EnglishGB,
      }),
      nameLocalizations: {
        [Locale.Dutch]: i18next.t("commands.panda.options.hide.name", {
          lng: Locale.Dutch,
        }),
      },
      descriptionLocalizations: {
        [Locale.Dutch]: i18next.t("commands.panda.options.hide.description", {
          lng: Locale.Dutch,
        }),
      },
    },
  ],
  execute,
}
