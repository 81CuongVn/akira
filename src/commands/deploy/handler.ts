import type { CommandInteraction } from "discord.js"
import { config } from "../../config"

export const execute = async (interaction: CommandInteraction<"cached">) => {
  const testGuild = await interaction.client.guilds.fetch(
    config.get("bot.testGuildID")
  )

  if (!testGuild) {
    throw new Error(
      `Test guild with ID: ${config.get("bot.testGuildID")} not found`
    )
  }

  // Using dynamic import to make sure translations are available
  const commands = await import("..")

  await testGuild.commands.set(Object.values(commands))

  interaction.reply({
    content: `Deployed ${Object.values(commands).length} commands.`,
    ephemeral: true,
  })
}
