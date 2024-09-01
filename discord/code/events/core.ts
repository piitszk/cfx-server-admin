import Cache from "@/utils/cache"
import Files from "@/utils/files"
import { CfxDiscordEvent } from "@/types/events"

export function LoadEvents(){
    const Application = Cache.get("Instance")

    Files(__dirname, {
        extensions: [".ts", ".js"],
        root: __dirname 
    }, async (Directory: string) => {
        if (Directory.split(".")[0].endsWith("core")) return

        const Data = require(Directory)
        const Event: CfxDiscordEvent = Data["event"]

        // Todo: Scheduled Events

        if (Event["type"]["startsWith"]("on")) {
            return Application[Event["type"]](Event["name"], Event["execute"])
        } else if (Event["type"] == "automatic") { 
            return setInterval(() => {
                Event["execute"]()
            }, (Event["minutes"] | 30) * (1000 * 60))
        }
    })
}