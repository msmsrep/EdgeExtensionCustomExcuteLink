// This script runs only on specific internal network pages defined in manifest.json.
// It does NOT access or read local files. It only intercepts user clicks on file:// links
// and converts them into a custom protocol so that the default application can open them.

let CUSTOM_PROTOCOL = null;

// Handle click events to detect when the user clicks a file:// link.
// The behavior is triggered ONLY by trusted user actions (e.isTrusted).
document.addEventListener("click", function (e) {
  if (!e.isTrusted) return;
  if (!CUSTOM_PROTOCOL) return;

  const el = e.target.closest("a");
  if (el && el.href.startsWith("file://")) {
    e.preventDefault();
    const url = el.href
      .replace("file:", CUSTOM_PROTOCOL)
      .replaceAll("/", "\\");
    window.location.href = url;
  }
});

// Request the custom protocol value from the background script.
// No data is collected or transmitted externally.
chrome.runtime.sendMessage({ type: "getProtocol" }, (res) => {
  CUSTOM_PROTOCOL = res.protocol;
});
