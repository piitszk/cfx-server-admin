-----------------------------------------------------------------------------------------------------------------------------------------
-- HTTPCALLBACK
-----------------------------------------------------------------------------------------------------------------------------------------
function HttpCallback(Response, Message, Code)
    Response.writeHead(Code or 200)
    Response.send(Message)
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- HTTPHANDLER
-----------------------------------------------------------------------------------------------------------------------------------------
SetHttpHandler(function(Request, Response)
    Request["setDataHandler"](function(Raw)
        local Decode = json.decode(Raw)

        if Request["headers"]["Authorization"] ~= Authorization then
            return Functions.Unauthorized(Request, Response, json.encode(Decode["args"]))
        end
        
        local Path = Request["path"]:gsub("/", "")

        if not Functions[Path] then
            return HttpCallback(Response, ("Function %s doesn't exist"):format(Path), 400)
        end

        _G["Response"] = Response
        
        Functions[Path](table.unpack(Decode["args"]))
    end)    
end)