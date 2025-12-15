// This script runs only on specific internal network pages defined in manifest.json.
// It does NOT access or read local files. It only intercepts user clicks on file:// links
// and converts them into a custom protocol so that the default application can open them.

let CUSTOM_PROTOCOL = null;
let TARGET_IPS = null;
// Handle click events to detect when the user clicks a file:// link.
// The behavior is triggered ONLY by trusted user actions (e.isTrusted).
// The allowed target IPs are restricted to a predefined list.
document.addEventListener("click", function (e) {
  if (!e.isTrusted) return;
  if (!CUSTOM_PROTOCOL) return;

  const el = e.target.closest("a");
  if (!el) return;

  try {
    const urlObj = new URL(el.href);
    // Only handle file:// URLs whose hostname matches the allowed IP list
    if (urlObj.protocol === "file:" && TARGET_IPS.includes(urlObj.hostname)) {
      e.preventDefault();

      // Convert to custom protocol UNC path
      const unc = `${CUSTOM_PROTOCOL}\\\\${urlObj.hostname}${urlObj.pathname.replace(/\//g, "\\")}`;
      window.location.href = unc;
    }
  } catch (err) {
    // Ignore values that cannot be parsed as a valid URL
    console.log(err);
  }
});

// Convert plain-text UNC paths into clickable links.
// Links use the custom protocol and do NOT trigger normal href navigation.
// Only UNC paths pointing to allowed IPs are converted.
function SetLinks() {
  const escapedIps = TARGET_IPS.map(ip => ip.replace(/\./g, "\\."));
  const rex = new RegExp(
    String.raw`\\\\(?:${escapedIps.join("|")})\\[^<>"\n\r]*`,
    "gi"
  );

  const qs = document.querySelectorAll(".Reference, .multiple-lines");
  qs.forEach(el => {
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);

    while (walker.nextNode()) {
      const node = walker.currentNode;
      const text = node.nodeValue;

      if (!text.match(rex)) continue;

      const frag = document.createDocumentFragment();
      const localRex = new RegExp(rex, rex.flags);

      let lastIndex = 0;
      let match;

      while ((match = localRex.exec(text)) !== null) {
        const before = text.slice(lastIndex, match.index);
        if (before) frag.appendChild(document.createTextNode(before));

        const link = document.createElement("a");
        link.href = `${CUSTOM_PROTOCOL}${match[0]}`;
        link.textContent = match[0];
        frag.appendChild(link);

        lastIndex = localRex.lastIndex;
      }

      const after = text.slice(lastIndex);
      if (after) frag.appendChild(document.createTextNode(after));

      node.replaceWith(frag);
    }
  });
}

// Request the custom protocol value from the background script.
// No data is collected or transmitted externally.
chrome.runtime.sendMessage({ type: "getProtocol" }, (res) => {
  CUSTOM_PROTOCOL = res.protocol;
});

// Request the allowed hostnames and initialize link conversion
chrome.runtime.sendMessage({ type: "getHostname" }, (res) => {
  TARGET_IPS = res.hostname;
  SetLinks();
});

