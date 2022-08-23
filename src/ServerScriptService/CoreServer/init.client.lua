local Players = game:GetService('Players')

local Services = {}

for i, v in pairs(script:GetChildren()) do
	if v.ClassName == "ModuleScript" then
		Services[v.Name] = require(v)
	end
end

Players.PlayerAdded:Connect(function(player)
	local prop = Services.Database.GetData(player)
	local document = Services.Database.GetDocument(player)
end)

Players.PlayerRemoving:Connect(function(player)
	Services.Database.SaveData(player)
end)

game:BindToClose(function()
	for _,plr in pairs(Players:GetPlayers()) do
		task.spawn(function()
			Services.Database.SaveData(plr)
		end)
	end
end)