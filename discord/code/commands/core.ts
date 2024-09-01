import Cache from "@/utils/cache"
import Files from "@/utils/files"
import { CfxDiscordCommand } from "@/types/commands"
import { REST, RESTPostAPIApplicationCommandsJSONBody, Routes } from "discord.js"
import { APPLICATION_ID, APPLICATION_TOKEN } from "settings.json"

export async function LoadCommands(){
    const ParseCommands: RESTPostAPIApplicationCommandsJSONBody[] = []

    Files(__dirname, {
        extensions: [".ts", ".js"],
        root: __dirname 
    }, async (Directory: string) => {
        if (Directory.split(".")[0].endsWith("core")) return

        const Data = require(Directory)
        const Command: CfxDiscordCommand = Data["command"]

        if (Command["inactive"]) return

        const Commands = Cache.get("Commands")
        const ParseCommand = Command["data"]

        Cache.put("Commands", [...Commands, { name: ParseCommand["name"], execute: Command["execute"] }])
        ParseCommands["push"](ParseCommand.toJSON())
    })

    const Rest = new REST().setToken(APPLICATION_TOKEN)

    await Rest.put(
        Routes.applicationCommands(APPLICATION_ID),
        { body: ParseCommands }
    )
}