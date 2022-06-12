import i18next from "i18next"
import type { Command } from "../command"
import { execute } from "./handler"
import {
  PermissionFlagsBits,
  ApplicationCommandType,
  ApplicationCommandOptionType,
  Locale,
} from "discord.js"

export const pandaCommand: Command = {
  type: ApplicationCommandType.ChatInput,
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
      type: ApplicationCommandOptionType.Boolean,
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
  defaultMemberPermissions: [
    PermissionFlagsBits.AttachFiles,
    PermissionFlagsBits.EmbedLinks,
  ],
  execute,
}
