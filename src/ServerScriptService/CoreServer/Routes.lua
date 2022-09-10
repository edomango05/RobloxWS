local Router = {}
Router.__index = Router

function Router.new()
    local self = {}
    setmetatable(self, Router)
    self.routes = {}
    return self
end

function Router:get(endpoint:string,callback)
    self.routes["GET "..endpoint] = callback
end

function Router:post(endpoint:string,callback)
    self.routes["POST "..endpoint] = callback
end

function Router:patch(endpoint:string,callback)
    self.routes["PATCH "..endpoint] = callback
end

return Router