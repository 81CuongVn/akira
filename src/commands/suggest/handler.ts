import {
  ChannelType,
  ChatInputCommandInteraction,
  ActionRowBuilder,
  EmbedBuilder,
  ModalBuilder,
  TextInputBuilder,
  Colors,
  TextInputStyle,
  ModalActionRowComponentBuilder,
} from "discord.js"
import i18next from "i18next"
import ms from "ms"
import { nanoid } from "nanoid"
import { config } from "../../config"
import { logger } from "../../logger"

export const execute = async (
  interaction: ChatInputCommandInteraction<"cached">
) => {
  const modalCustomId = nanoid()
  const textInputCustomId = nanoid()

  const modal = new ModalBuilder()
    .setCustomId(modalCustomId)
    .setTitle(
      i18next.t("commands.suggest.modal_title", { lng: interaction.locale })
    )

  const textInputComponent = new TextInputBuilder()
    .setCustomId(textInputCustomId)
    .setLabel(
      i18next.t("commands.suggest.text_input_component_label", {
        lng: interaction.locale,
      })
    )
    .setStyle(TextInputStyle.Paragraph)
    .setMinLength(24)

  const messageActionRow =
    new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
      textInputComponent
    )

  modal.addComponents(messageActionRow)

  await interaction.showModal(modal)

  try {
    const modalSubmitInteraction = await interaction.awaitModalSubmit({
      filter: (modalSubmitInteraction) => {
        return modalSubmitInteraction.customId === modalCustomId
      },
      time: ms("1h"),
    })

    const feedbackChannel = await interaction.client.channels.fetch(
      config.get("bot.feedbackChannelID")
    )

    if (feedbackChannel?.type !== ChannelType.GuildText) {
      throw new Error(
        `Could not fetch feedback text channel with ID: ${config.get(
          "bot.feedbackChannelID"
        )}`
      )
    }

    const textInputValue =
      modalSubmitInteraction.fields.getTextInputValue(textInputCustomId)

    const messageEmbed = new EmbedBuilder()
      .setColor(Colors.Blue)
      .setTitle("New modal submission")
      .setDescription(textInputValue)
      .setFooter({
        iconURL: interaction.user.displayAvatarURL(),
        text: `Submitted by ${interaction.user.tag} | ${interaction.user.id}`,
      })

    await feedbackChannel.send({ embeds: [messageEmbed] })

    modalSubmitInteraction.reply({
      content: i18next.t("commands.suggest.modal_submit_reply", {
        lng: interaction.locale,
      }),
      ephemeral: true,
    })
  } catch (error) {
    logger.error(error)
  }
}
