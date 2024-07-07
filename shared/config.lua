Config = {}
Config.notificationStyle = "normal"  -- Options: "normal", "minimalistic", "small"

-- Defines different types of notifications - You can add your own, but you will need to support this in the client.lua & the NUI Code.
Config.notificationTypes = {
    info = {
        bgColor = 'bg-gray-800',
        barColor = 'bg-blue-500',
        textColor = 'text-white',
        icon = 'ℹ️',
        title = 'Information',
        image = '',  -- URL to an image
        sound = 'sounds/info.wav'  -- URL to a sound file
    },
    success = {
        bgColor = 'bg-gray-800',
        barColor = 'bg-green-500',
        textColor = 'text-white',
        icon = '✅',
        title = 'Success',
        image = '',
        sound = 'sounds/success.wav'
    },
    warning = {
        bgColor = 'bg-gray-800',
        barColor = 'bg-yellow-500',
        textColor = 'text-white',
        icon = '⚠️',
        title = 'Warning',
        image = '',
        sound = 'sounds/warning.wav'
    },
    error = {
        bgColor = 'bg-gray-800',
        barColor = 'bg-red-500',
        textColor = 'text-white',
        icon = '❌',
        title = 'Error',
        image = '',
        sound = 'sounds/error.wav'
    }
}

-- Default notification display time in milliseconds
Config.displayTime = 5000

-- Enable or disable debug prints | ONLY KEEP ON WHEN TESTING
Config.debug = false
