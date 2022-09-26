local http = game:GetService("HttpService")
local API = {}

local BASE = "http://127.0.0.1:3001"

local BASE_HEADERS = {["Content-Type"] = 'application/json'}

local function request(endpoint, method, body)
	return pcall(function()
		return http:RequestAsync({
			Url = BASE..endpoint,
			Headers = body and BASE_HEADERS or {},
			Method = method,
			Body = body and http:JSONEncode(body) or nil
		})
	end)
end
function API.request(...)
	return request(...)
end

return API
