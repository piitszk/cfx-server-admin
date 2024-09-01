import { CommandInteraction } from "discord.js";
import { Post } from "./http-request";

export default async function CfxCommand(interaction: CommandInteraction, Path: string, Args: any[]){
    Post(Path, Args).then(async (Response) => {
        await interaction.editReply({ content: Response.data })
    }).catch(async (ERROR) => {
        if (!ERROR.response) {
            return await interaction.editReply({ content: "O servidor não está online." })
        } else if(/Route\b.*\bnot found\b/.test(ERROR.response.data)) {
            return await interaction.editReply({ content: "A API não está disponível." })
        }

        await interaction.editReply({ content: ERROR.response.data })
    })
}