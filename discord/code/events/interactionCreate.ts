import { CfxDiscordEvent } from "@/types/events"
import { Events, Interaction } from "discord.js"
import Cache from "@/utils/cache"

interface CfxCommand {
    name: string
    execute: Function
}

export const event: CfxDiscordEvent = {
    name: Events.InteractionCreate,
    type: "on",
    execute: async (interaction: Interaction) => { 
        if ("customId" in interaction) {
            return await interaction.client.emit(interaction.customId, interaction)
        }

        if (interaction.isCommand()){ 
            const Commands: CfxCommand[] = Cache.get("Commands")
            const Command: CfxCommand = Commands.find((C) => { return C["name"] == interaction["commandName"] })

            if (!Command) return interaction.reply({ content: `This command isn't available <@${interaction.user.id}>.` })
     
            Command["execute"](interaction)
        }
    }
}