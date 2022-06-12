import { ApplicationCommandType, PermissionFlagsBits, Locale } from "discord.js"
import i18next from "i18next"
import type { Command } from "../command"
import { conditions } from "../conditions"
import { execute } from "./handler"

export const deployCommand: Command = {
  type: ApplicationCommandType.ChatInput,
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
  // TODO: Once possible, only make this command available to the bot owner only.
  defaultMemberPermissions: [PermissionFlagsBits.Administrator],
  dmPermission: false,
  execute,
}
