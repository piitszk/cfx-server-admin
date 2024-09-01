import { CfxDiscordEvent } from "@/types/events"
import { Events } from "discord.js"
import Cache from "@/utils/cache"
import { blue } from "colors"

export const event: CfxDiscordEvent = {
    name: Events.ClientReady,
    type: "once",
    execute: () => {
        console.log(`
            #####     ####     ####    ######    #####   ######   ##  ##  
            ##  ##     ##       ##       ##     ##          ##    ## ##   
            #####      ##       ##       ##      ####      ##     ####    
            ##         ##       ##       ##         ##    ##      ## ##   
            ##        ####     ####      ##     #####    ######   ##  ## 
        `)

        console.log(blue(`[>] ${Cache.get("Commands").length} commands loaded.`))
    }
}