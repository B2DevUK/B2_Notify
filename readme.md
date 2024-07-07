# B2_Notify Notification Script

## Overview

This script provides a customizable notification system for FiveM servers using Vue.js and Tailwind CSS. The notifications can be styled in different ways, including normal, minimalistic, and small versions.

I'd like to preface this by saying yes, this system is extremely simplistic as I intend on regularly adding new styles of notifications to it, and no, despite the UI looking similar to some other notification systems, this is entirely my code, written from scratch. Any instance of similar code is completely coincidental, if there is any.

## Features

- Customizable notification styles: normal, minimalistic, and small
- Configurable notification types with different colors, icons, sounds, and display times
- Responsive design using Tailwind CSS
- Easy integration with existing FiveM server setups

## Installation

1. **Download the script**:
   - Clone this repository or download the ZIP file and extract it.

   - Due to the use of CDNs, you do not need to ensure you have the necessary dependencies:
    - [Vue.js](https://vuejs.org/)
    - [Tailwind CSS](https://tailwindcss.com/)

2. **Place the script in your resources folder**:
   - Move the extracted folder to your `resources` directory in your FiveM server.

3. **Add the script to your server configuration**:
   - Open your `server.cfg` file and add the following line:
     ```
     ensure b2_notify
     ```
     Replace `b2_notify` with the name of the folder you placed in the `resources` directory.

4. **Start your server**:
   - Restart your FiveM server or start it if it was not running.

## Configuration

### `config.lua`

Configure the notification styles and types in the `config.lua` file:

```lua
Config = {}
Config.NotificationStyle = "normal"  -- Options: "normal", "minimalistic", "small"

Config.NotificationTypes = {
    ["error"] = {
        bgColor = "bg-red-500",
        barColor = "bg-red-700",
        textColor = "text-white",
        icon = "❌",
        displayTime = 5000,
        title = "Error",
        image = "",
        sound = "error.wav"
    },
    ["success"] = {
        bgColor = "bg-green-500",
        barColor = "bg-green-700",
        textColor = "text-white",
        icon = "✅",
        displayTime = 5000,
        title = "Success",
        image = "",
        sound = "success.wav"
    }
}
```

## Usage

### Client-Side

Use the `notify` export to add notifications in other resources. For example:

```lua
exports['b2_notify']:notify('success', 'This is a success notification from another script', 'bottom-right');
```

### Notification Types

- `error`: Displays an error notification.
- `success`: Displays a success notification.
- `warning`: Displays a warning notification.
- `info`: Displays an info notification.

### Notification Styles

- `normal`: Default style with all features.
https://github.com/B2DevUK/B2_Notify/blob/main/github/Screenshot_2.png & https://github.com/B2DevUK/B2_Notify/blob/main/github/Screenshot_3.png
- `minimalistic`: Simplified style without a progress bar.
- `small`: Compact style with reduced size.
https://github.com/B2DevUK/B2_Notify/blob/main/github/Screenshot_1.png

## Files

### `index.html`
HTML structure for the notification system.

### `styles.css`
CSS styles for the notifications using Tailwind CSS.

### `app.js`
JavaScript file implementing the Vue.js logic for notifications.

### `config.lua`
Lua configuration file for defining notification types and styles.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## Author and Support

For more scripts and support, visit my GitHub and join my Discord.

- GitHub: [B2DevUK](https://github.com/B2DevUK)
- Discord: [B2 Scripts](https://discord.gg/KZRBA6H5kR)

## Other Scripts

Here are some other scripts that use this notification resource:

- [Anti Bunny Hop](https://github.com/B2DevUK/B2_AntiBunnyHop)
- [AFK System](https://github.com/B2DevUK/B2_AFKSystem)

## Support
If you have any issues or suggestions, please open an issue on the GitHub repository, or in my script [discord](https://discord.gg/KZRBA6H5kR)