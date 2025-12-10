// This background script supports the extension's functionality on specific internal network pages.
// It does NOT collect, store, or transmit any user data. All actions are triggered only by explicit
// user interactions such as selecting text and choosing a context menu item.

// Import configuration values (custom protocol and allowed URL patterns)
import { CUSTOM_PROTOCOL } from "./config.js";
import { TARGET_URLS } from "./config.js";


// Respond to requests from content scripts by returning the custom protocol.
// No external communication or data processing is performed.
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "getProtocol") {
    sendResponse({ protocol: CUSTOM_PROTOCOL });
  }
});

// Regular expression to detect UNC paths (e.g., \\server\path)
const REGEXP_LINK = /((\\\\)[^<>"\n\r]*)/gi;
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
  // 親メニュー
  chrome.contextMenus.create({
    id: "mainMenu",
    title: "カスタムメニュー",
    contexts: ["all"],
    documentUrlPatterns: TARGET_URLS,  // Only active on internal network pages
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
// Only executes when the user explicitly selects a menu item.
chrome.contextMenus.onClicked.addListener((info, tab) => {
  const menu = MENU_ITEMS.find(item => item.id === info.menuItemId);
  if (menu && typeof menu.handler === "function") {
    menu.handler(info, tab);
  }
});

// Converts a selected UNC path into a custom protocol URL and opens it.
// This does NOT read local files; it only transforms the selected text.
function handleOpenLink(info) {
  const text = info.selectionText || "";
  const url = text.replace(REGEXP_LINK, `${CUSTOM_PROTOCOL}$1`);
  // Open the custom protocol URL, which launches the default application.
  chrome.tabs.create({ url });
}
