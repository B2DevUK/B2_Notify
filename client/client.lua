-- Function to send a notification
function sendNotification(messageType, message, position)
    if Config.debug then
        print("Sending notification:", messageType, message, position) 
    end
    SendNUIMessage({
        type = 'notification',
        messageType = messageType,
        message = message,
        position = position
    })
end

-- Register the export
exports('notify', sendNotification)

-- Register test commands for each notification type and position
local positions = {"top", "top-right", "top-left", "center", "center-right", "center-left", "bottom", "bottom-right", "bottom-left"}

for _, pos in ipairs(positions) do
    RegisterCommand('testinfo_' .. pos, function(source, args, rawCommand)
        sendNotification('info', 'This is an info notification at ' .. pos, pos)
    end, false)

    RegisterCommand('testsuccess_' .. pos, function(source, args, rawCommand)
        sendNotification('success', 'This is a success notification at ' .. pos, pos)
    end, false)

    RegisterCommand('testwarning_' .. pos, function(source, args, rawCommand)
        sendNotification('warning', 'This is a warning notification at ' .. pos, pos)
    end, false)

    RegisterCommand('testerror_' .. pos, function(source, args, rawCommand)
        sendNotification('error', 'This is an error notification at ' .. pos, pos)
    end, false)
end

-- Ensure that configuration is sent correctly
AddEventHandler('onResourceStart', function(resourceName)
    if (GetCurrentResourceName() ~= resourceName) then
        return
    end

    if Config.debug then
        print("Resource started: " .. resourceName)
        print("Config content:", json.encode(Config, {indent = true}))  -- Pretty print the config
    end
    SendNUIMessage({
        type = 'config',
        config = json.encode(Config)
    })
    if Config.debug then
        print("Config sent to NUI")
    end
end)

Citizen.CreateThread(function()
    Citizen.Wait(1000)  -- Wait a short time to ensure resource is fully started
    if Config.debug then
        print("Sending config to NUI", json.encode(Config)) 
    end
    SendNUIMessage({
        type = 'config',
        config = json.encode(Config)
    })
end)
