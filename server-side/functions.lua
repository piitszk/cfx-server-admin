-----------------------------------------------------------------------------------------------------------------------------------------
-- PROXY
-----------------------------------------------------------------------------------------------------------------------------------------
Tunnel = module("lib/Tunnel")
Proxy = module("lib/Proxy")
-----------------------------------------------------------------------------------------------------------------------------------------
-- CONNECTION
-----------------------------------------------------------------------------------------------------------------------------------------
vRP = Proxy.getInterface("vRP")
vRPC = Tunnel.getInterface("vRP")
-----------------------------------------------------------------------------------------------------------------------------------------
-- VARIABLES
-----------------------------------------------------------------------------------------------------------------------------------------
Functions = {}
Delayed = {}
Authorization = GetConvar("sv_licenseKey", "null")
Debug = GetResourceMetadata(GetCurrentResourceName(), "server_debug", 0) == "true"
-----------------------------------------------------------------------------------------------------------------------------------------
-- REVIVE
-----------------------------------------------------------------------------------------------------------------------------------------
function Functions.Revive(Passport)
    local Response = Response
    local Source = vRP.Source(Passport)
    local Identity = vRP.Identity(Passport)

    if not Identity then
        return HttpCallback(Response, Translation["PLAYER_NOT_EXIST"]:format(Passport))
    elseif not Source then
        return HttpCallback(Response, Translation["PLAYER_OFFLINE"]:format(Passport))
    end

    vRP.Revive(Source,300)
    vRP.SetArmour(Source,100)
    vRP.UpgradeThirst(Passport,100)
    vRP.UpgradeHunger(Passport,100)
    vRP.DowngradeStress(Passport,100)

    TriggerClientEvent("Notify", Source, "Angelical", Translation["PLAYER_REVIVE"]:format(Identity["Name"], Identity["Lastname"], Passport), "verde", 15000)
    HttpCallback(Response, Translation["PLAYER_REVIVE"]:format(Identity["Name"], Identity["Lastname"], Passport))
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- GIVE
-----------------------------------------------------------------------------------------------------------------------------------------
function Functions.Give(Passport, Item, Amount)
    local Response = Response
    local Source = vRP.Source(Passport)
    local Identity = vRP.Identity(Passport)

    Amount = parseInt(Amount)

    if not ItemExist(Item) then
        return HttpCallback(Response, Translation["ITEM_NOT_EXIST"]:format(Item))
    elseif Amount <= 0 then
        return HttpCallback(Response, Translation["AMOUNT_INVALID"])
    elseif not Identity then
        return HttpCallback(Response, Translation["PLAYER_NOT_EXIST"]:format(Passport))
    elseif not Source then
        return HttpCallback(Response, Translation["PLAYER_OFFLINE"]:format(Passport))
    end
    
    vRP.GiveItem(Passport, Item, Amount, true)

    TriggerClientEvent("Notify", Source, "Angelical", Translation["PLAYER_GIVE"]:format(Amount, ItemName(Item)), "verde", 15000)
    HttpCallback(Response, Translation["PLAYER_GIVE"]:format(Identity["Name"], Identity["Lastname"], Passport, Amount, ItemName(Item)))
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- COORDINATES
-----------------------------------------------------------------------------------------------------------------------------------------
function Functions.Coordinates(Passport)
    local Response = Response
    local Source = vRP.Source(Passport)
    local Identity = vRP.Identity(Passport)

    if not Identity then
        return HttpCallback(Response, Translation["PLAYER_NOT_EXIST"]:format(Passport))
    elseif not Source then
        return HttpCallback(Response, Translation["PLAYER_OFFLINE"]:format(Passport))
    end

    local Coordinates = GetEntityCoords(GetPlayerPed(Source))

    HttpCallback(Response, Translation["PLAYER_COORDINATES"]:format(Identity["Name"], Identity["Lastname"], Passport, Optimize(Coordinates["x"]), Optimize(Coordinates["y"]), Optimize(Coordinates["z"])))
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- INVENTORY
-----------------------------------------------------------------------------------------------------------------------------------------
function Functions.Inventory(Passport)
    local Response = Response
    local Source = vRP.Source(Passport)
    local Identity = vRP.Identity(Passport)

    if not Identity then
        return HttpCallback(Response, Translation["PLAYER_NOT_EXIST"]:format(Passport))
    elseif not Source then
        return HttpCallback(Response, Translation["PLAYER_OFFLINE"]:format(Passport))
    end

    local Inventory = vRP.Inventory(Passport)
    local String = Translation["INVENTORY_EMPTY"]

    if CountTable(Inventory) > 0 then
        String = ""
        for Index, Item in pairs(Inventory) do
            if ItemExist(Item["item"]) then
                String = String..Item["amount"].."x "..ItemName(Item["item"]).."\n"
            end
        end
    end

    HttpCallback(Response, Translation["PLAYER_INVENTORY"]:format(Identity["Name"], Identity["Lastname"], Passport, String))
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- DISCORD WEBHOOK
-----------------------------------------------------------------------------------------------------------------------------------------
function Functions.Unauthorized(Request, Response, Arguments)
    PerformHttpRequest(Webhook, function(Err, Text, Headers) end, "POST", json.encode({
        ["embeds"] = {
            {
                ["color"] = 16711680,
                ["title"] = Request["address"].." - "..os.date("%d/%m/%Y %H:%M:%S"),
                ["description"] = "Attempt to access the server with an invalid token.",
                ["fields"] = {
                    {
                        ["name"] = "Route",
                        ["value"] = Request["path"],
                        ["inline"] = true
                    },
                    {
                        ["name"] = "Arguments",
                        ["value"] = Arguments,
                        ["inline"] = true
                    }
                }
            }
        }
    }), { ["Content-Type"] = "application/json" })

    HttpCallback(Response, Translation["UNAUTHORIZED_ACCESS"])

    if Debug then
        print("^1[Unauthorized Access]^7 "..Request["address"].." - "..os.date("%d/%m/%Y %H:%M:%S"))
    end
end