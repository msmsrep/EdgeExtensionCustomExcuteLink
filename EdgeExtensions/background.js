// 参考　https://developer.chrome.com/docs/extensions/mv2/reference/contextMenus?hl=ja#examples
// urlを選択して右クリックメニュー
// ローカルリンクの場合、カスタムプロトコルに置き換えて既定のアプリで開く

// 定数定義
const REGEXP_LINK = /((\\\\)[^<>"\n\r]*)/gi;
const MENU_ITEMS = [
  {
    id: "openLink",
    title: "リンクを開く",
    contexts: ["selection"],
    handler: handleOpenLink
  },
  // メニューを追加したい場合
  // {
  //   id: "copyURL",
  //   title: "URLをコピー",
  //   contexts: ["all"],
  //   handler: handleCopyURL
  // }
];

// インストール時にメニューをまとめて作成
chrome.runtime.onInstalled.addListener(() => {
  // 親メニュー
  chrome.contextMenus.create({
    id: "mainMenu",
    title: "カスタムメニュー",
    contexts: ["all"],
    documentUrlPatterns: ["http://192.168.12.207/*", "http://192.168.31.106/*"],
  });

  // 子メニューを一括生成
  MENU_ITEMS.forEach(item => {
    chrome.contextMenus.create({
      id: item.id,
      parentId: "mainMenu",
      title: item.title,
      contexts: item.contexts
    });
  });
});

// クリックイベントの一元ハンドリング
chrome.contextMenus.onClicked.addListener((info, tab) => {
  const menu = MENU_ITEMS.find(item => item.id === info.menuItemId);
  if (menu && typeof menu.handler === "function") {
    menu.handler(info, tab);
  }
});


// 選択テキスト中の「\\…」を特定形式に置き換えて新規タブで開く
function handleOpenLink(info) {
  const text = info.selectionText || "";
  const url = text.replace(REGEXP_LINK, "cel29ee206a1f00425aabc2248aa432d2590000012:$1");
  chrome.tabs.create({ url });
}

// 現在のタブの URL をクリップボードにコピーする例
// function handleCopyURL(_info, tab) {
//   const url = tab.url || "";
//   navigator.clipboard.writeText(url).catch(console.error);
// }
