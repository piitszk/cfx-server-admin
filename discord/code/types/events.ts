import { Hours } from "@/types/hours"

export type CfxDiscordEventBase = {
    name: string
    execute: Function
    type: "on" | "once" | "scheduled" | "automatic"
}

export type CfxDiscordEventAutomatic = CfxDiscordEventBase & {
    type: "automatic"
    minutes: number
}

export type CfxDiscordEventScheduled = CfxDiscordEventBase & {
    type: "scheduled"
    hour: Hours
    minutes?: never
}

export type CfxDiscordEventOther = CfxDiscordEventBase & {
    type: "on" | "once"
    minutes?: never
}

export type CfxDiscordEvent = CfxDiscordEventAutomatic | CfxDiscordEventScheduled | CfxDiscordEventOther
