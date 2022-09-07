local http = game:GetService("HttpService")
local ReplicatedStorage = game:GetService('ReplicatedStorage')
local UpdateClient = ReplicatedStorage.Remotes.UpdateData
local API = {}

local datas:{[string]:PROFILE} = {}

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

function API.GetDocument(player)
	return datas[player.UserId]
end

function API.GetData(player)
	if player then
		local success, data = request("/api/user/"..player.UserId, "GET")
		print(data)
		if not success then
			return print("Problemi interni ::1")
		end
		if data.StatusCode == 200 then
			if type(data.Body) == 'string' then
				pcall(function()
					datas[player.UserId] = http:JSONDecode(data.Body)
				end) 
				return datas[player.UserId]
			end
		elseif data.StatusCode == 404 then 
			local success, data = request("/api/user/"..player.UserId, "POST")
			if not success then
				return print("Problemi interni ::2")
			end 
			if data.StatusCode == 200 then
				if type(data.Body) == 'string' then
					pcall(function()
						datas[player.UserId] = http:JSONDecode(data.Body)
					end) 
					return datas[player.UserId]
				end
			elseif data.StatusCode == 409 then 
				return print("Problemi interni ::3 ALRDINUSE")
			elseif data.StatusCode == 500 then 
				return print("Problemi interni ::3 INTERNAL")
			end
		end
		return print("Problemi interni ::4 NOTSPECFD")
	end	
end

function API.SaveData(player)
	if player and datas[player.UserId] then
		datas[player.UserId].modlogs = nil
		local success, data = request("/api/user/"..player.UserId, "PATCH",datas[player.UserId])
		if not success then
			return print("Errore nel salvataggio dei dati")
		end 
		datas[player.UserId] = nil
	end
end

function API.Set(player,data)
	if player and datas[player.UserId] and data then
		for k,v in pairs(data) do
			datas[player.UserId].store[k]= v
		end
		UpdateClient:FireClient(player,datas[player.UserId].store)
		return datas[player.UserId]
	end
end

function API.Can(player,much,method)
	if player and datas[player.UserId] and much then
		return datas[player.UserId].store[method] - math.floor(math.abs(much)) > 0
	end
end

function API.Increase(player,much,method)
	if player and datas[player.UserId] and much then
		datas[player.UserId].store[method] += math.floor(much)
		UpdateClient:FireClient(player,datas[player.UserId].store)
	end
end

function API.request(...)
	return request(...)
end

return API
