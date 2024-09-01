import { CfxDiscordCommand } from "@/types/commands";
import { CommandInteraction, SlashCommandBuilder } from "discord.js"
import CfxCommand from "@/utils/cfx-command"

export const command: CfxDiscordCommand = {
    data: new SlashCommandBuilder()
    .setName("coordinates")
    .setDescription("Pegar a coordenada atual do jogador")
    .setDescriptionLocalizations({
        "en-US": "Get the player's current coordinates"
    })
    .setDefaultMemberPermissions(8)
    .addNumberOption(Option => 
        Option.setName("id")
        .setDescription("Qual o ID do jogador?")
        .setDescriptionLocalizations({
            "en-US": "What is the player's ID?"
        })  
        .setMinValue(1)
        .setRequired(true)
    ),

    execute: async (interaction: CommandInteraction) => {
        const id = interaction.options.get("id")["value"]

        await interaction.deferReply({ ephemeral: true })
        await CfxCommand(interaction, "Coordinates", [id])
    }
}