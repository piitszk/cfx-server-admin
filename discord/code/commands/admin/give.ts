import { CfxDiscordCommand } from "@/types/commands";
import { CommandInteraction, SlashCommandBuilder } from "discord.js"
import CfxCommand from "@/utils/cfx-command"

export const command: CfxDiscordCommand = {
    data: new SlashCommandBuilder()
    .setName("give")
    .setDescription("Adiciona um item ao inventário do jogador")
    .setDescriptionLocalizations({
        "en-US": "Add an item to the player's inventory."
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
    )
    .addStringOption(Option => 
        Option.setName("item")
        .setDescription("Qual item que será adicionado?")
        .setDescriptionLocalizations({
            "en-US": "Which item will be added?"
        })  
        .setRequired(true)
    )
    .addNumberOption(Option => 
        Option.setName("amount")
        .setDescription("Qual a quantidade desse item?")
        .setDescriptionLocalizations({
            "en-US": "Which amount of items will be added?"
        })  
    )
    ,

    execute: async (interaction: CommandInteraction) => {
        const id = interaction.options.get("id")["value"]
        const item = interaction.options.get("item")["value"]
        const amount = interaction.options.get("amount")

        await interaction.deferReply({ ephemeral: true })
        await CfxCommand(interaction, "Give", [id, item, amount ? amount["value"] : 1])
    }
}