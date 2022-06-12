import { ChatInputCommandInteraction, EmbedBuilder } from "discord.js"
import i18next from "i18next"
import { unsplash } from "../../lib/unsplash"
import { logger } from "../../logger"

export const execute = async (
  interaction: ChatInputCommandInteraction<"cached">
) => {
  const hide = interaction.options.getBoolean("hide")
  const randomPhoto = await unsplash.photos.getRandom({
    query: "panda",
    contentFilter: "high",
  })

  if (randomPhoto.type === "error") {
    await interaction.reply({
      content: i18next.t("common.something_went_wrong", {
        lng: interaction.locale,
        suggestCommandName: i18next.t("commands.suggest.name", {
          lng: interaction.locale,
        }),
      }),
      ephemeral: true,
    })

    return logger.error(randomPhoto.errors[0])
  }

  if (Array.isArray(randomPhoto.response)) {
    throw new Error("Unsplash returned an array of photos")
  }

  const urlSearchParams = new URLSearchParams({
    utm_source: process.env["npm_package_name"]!,
    utm_medium: "referral",
  })

  const messageEmbed = new EmbedBuilder()
    .setColor("Blue")
    .setAuthor({
      iconURL: randomPhoto.response.user.profile_image.small,
      name: i18next.t("commands.panda.attribution", {
        lng: interaction.locale,
        author: randomPhoto.response.user.name,
      }),
      url: `${randomPhoto.response.user.links.html}?${urlSearchParams}`,
    })
    .setDescription(
      i18next.t("commands.panda.powered_by", {
        lng: interaction.locale,
        url: `https://unsplash.com/?${urlSearchParams}`,
      })
    )
    .setImage(randomPhoto.response.urls.regular)
    .setFooter({
      text:
        randomPhoto.response.description ??
        randomPhoto.response.alt_description ??
        i18next.t("commands.panda.no_description", { lng: interaction.locale }),
    })

  interaction.reply({ embeds: [messageEmbed], ephemeral: hide ?? true })
}
