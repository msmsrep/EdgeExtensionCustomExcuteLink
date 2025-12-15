// This background script supports the extension's functionality on specific internal network pages.
// It does NOT collect, store, or transmit any user data. All actions are triggered solely by explicit
// user interactions such as selecting text or choosing a context menu item.

// Import configuration values (custom protocol, allowed URL patterns, and allowed IP addresses)
import { TARGET_URLS, CUSTOM_PROTOCOL, TARGET_IPS } from "./config.js";

// Respond to requests from content scripts by returning configuration values.
// No external communication or user data processing is performed.
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.type === "getProtocol") {
        sendResponse({ protocol: CUSTOM_PROTOCOL });
    }
    if (msg.type === "getHostname") {
        sendResponse({ hostname: TARGET_IPS });
    }
});

// Context menu definitions
const MENU_ITEMS = [
    {
        id: "openLink",
        title: "リンクを開く",
        contexts: ["selection"],
        handler: handleOpenLink
    },
];

// Create context menus when the extension is installed.
// Menus are restricted to specific internal network URLs for safety.
chrome.runtime.onInstalled.addListener(() => {
    // Parent menu
    chrome.contextMenus.create({
        id: "mainMenu",
        title: "カスタムメニュー",
        contexts: ["all"],
        documentUrlPatterns: TARGET_URLS, // Only active on internal network pages
    });

    // Child menu items
    MENU_ITEMS.forEach(item => {
        chrome.contextMenus.create({
            id: item.id,
            parentId: "mainMenu",
            title: item.title,
            contexts: item.contexts
        });
    });
});

// Centralized handler for context menu clicks.
// Executes only when the user explicitly selects a menu item.
chrome.contextMenus.onClicked.addListener((info, tab) => {
    const menu = MENU_ITEMS.find(item => item.id === info.menuItemId);
    if (menu && typeof menu.handler === "function") {
        menu.handler(info, tab);
    }
});

// Converts a selected file:// URL into a custom‑protocol UNC-style path and opens it.
// This function does NOT read or access local files; it only transforms user‑selected text.
// Only URLs whose hostname matches the allowed IP list are processed.
function handleOpenLink(info) {
    const text = info.selectionText || "";

    try {
        const urlObj = new URL(text);

        // Only handle file:// URLs pointing to allowed IP addresses
        if (urlObj.protocol === "file:" && TARGET_IPS.includes(urlObj.hostname)) {

            // Convert to custom protocol UNC path
            const unc = `${CUSTOM_PROTOCOL}\\\\${urlObj.hostname}${urlObj.pathname}`;
            chrome.tabs.create({ url: unc });
        }
    } catch (err) {
        // Ignore values that cannot be parsed as a valid URL
        console.log(err);
    }
}
