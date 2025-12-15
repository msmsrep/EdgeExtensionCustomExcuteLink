// This file defines static configuration values used by the extension.
// No data is collected, stored, or transmitted. All values are predefined
// and used only to support functionality on specific internal network pages.

// Custom protocol used to open UNC paths with the default application.
// This protocol must already be registered on the user's system.
export const CUSTOM_PROTOCOL = "cel34ca2102-4e2c-4a7c-8af9-a46fe61750a9:";

// List of internal network URLs where the extension is allowed to operate.
// The extension does NOT run on external or public websites.
export const TARGET_URLS = [
  "http://192.168.12.207/*",
  "http://192.168.31.106/*",
];

// List of allowed IP addresses for UNC path handling.
// Only paths pointing to these IPs will be processed.
export const TARGET_IPS = ["192.168.31.179", "192.168.12.203"];
