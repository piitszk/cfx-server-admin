import { JSONEncodable, RESTPostAPIApplicationCommandsJSONBody } from "discord.js"

export type CfxDiscordCommand = { 
    data: JSONEncodable<RESTPostAPIApplicationCommandsJSONBody>
    execute: Function
    inactive?: boolean
}