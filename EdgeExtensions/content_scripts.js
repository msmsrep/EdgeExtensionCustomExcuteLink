let CUSTOM_PROTOCOL = null;

// // ローカルファイルへのリンクが付いた状態のものを、
// // クリックした時にカスタムプロトコルに置き換えて既定のアプリで開く
document.addEventListener("click", function (e) {
  if (!e.isTrusted) return;
  if (!CUSTOM_PROTOCOL) return;

  const el = e.target.closest("a");
  if (el && el.href.startsWith("file://")) {
    // 通常の遷移を無効化
    e.preventDefault();
    const url = el.href
      .replace("file:", CUSTOM_PROTOCOL)
      .replaceAll("/", "\\");
    window.location.href = url;
  }
});

// プロトコルを取得するだけの処理
chrome.runtime.sendMessage({ type: "getProtocol" }, (res) => {
  CUSTOM_PROTOCOL = res.protocol;
});
