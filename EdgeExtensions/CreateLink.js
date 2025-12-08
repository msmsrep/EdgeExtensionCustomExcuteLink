// // ローカルファイルへのリンクが付いた状態のものを、
// // クリックした時にカスタムプロトコルに置き換えて既定のアプリで開く
chrome.runtime.sendMessage({ type: "getProtocol" }, (res) => {
  const CUSTOM_PROTOCOL = res.protocol;
  document.addEventListener("click", function (e) {
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
});
