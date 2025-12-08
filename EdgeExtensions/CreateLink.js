// テキストURLをリンクに変更する
// href遷移はしないようにする

const exp = /((\\\\)[^<>"\n\r]*)/gi;
const qs = document.querySelectorAll(".Reference, .multiple-lines");

for (let i = 0; i < qs.length; i++) {
  const r = qs
    .item(i)
    .textContent.replace(
      exp,
      "<a href='cel29ee206a1f00425aabc2248aa432d2590000012:$1'>$1</a>"
    );
  qs.item(i).innerHTML = r;
}

// ローカルファイルへのリンクが付いた状態のものを、
// クリックした時にカスタムプロトコルに置き換えて既定のアプリで開く
document.addEventListener('click', function (e) {
  const el = e.target.closest('a');
  if (el && el.href.startsWith('file://')) {
    e.preventDefault(); // 通常の遷移を無効化
    const url = el.href.replace('file:', "cel29ee206a1f00425aabc2248aa432d2590000012:").replaceAll('/', '\\');
    window.location.href = url;
  }
});
