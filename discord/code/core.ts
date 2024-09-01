import { Client, GatewayIntentBits } from "discord.js"
import { APPLICATION_TOKEN } from "settings.json"
import { LoadCommands } from "@/commands/core"
import { LoadEvents } from  "@/events/core"
import Cache from "@/utils/cache"

const Application = new Client({
    intents: [
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.Guilds
    ]
})

Cache.put("Instance", Application)
Cache.put("Commands", [])
Cache.put("Events", [])
Cache.put("Environment", __filename.endsWith(".ts") ? "code" : "dist")

LoadCommands()
LoadEvents()

Application.login(APPLICATION_TOKEN)