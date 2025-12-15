# ストア文章
## 英語
This extension is designed for use within an internal corporate network. It enhances specific intranet pages by providing a convenient way to open UNC paths using a custom protocol registered on the user's system.

When a user selects a UNC path (such as \\server\folder\file) and chooses the custom context menu option, the extension converts the path into a predefined custom protocol and opens it with the default application. This allows users to quickly access shared folders or files directly from the browser without manually copying and pasting paths.

The extension operates only on predefined internal network URLs and only in response to explicit user actions such as clicking a link or selecting a context menu item. It does not read local file contents, collect personal information, or transmit any data outside the user's environment. The only permission used is "contextMenus", and no external communication is performed.

Key features:
- Adds a custom context menu for UNC paths on specific internal network pages
- Converts UNC paths into a custom protocol and opens them with the default application
- Works exclusively on internal URLs defined in the extension settings
- Activates only on user-initiated actions
- Does not collect, store, or transmit any user data

This extension is intended for internal use only and is not designed for public distribution.

## 日本語
この拡張機能は、社内ネットワーク内で利用される特定のイントラネットページ向けに設計されています。ページ上で選択した UNC パス（例：\\server\folder\file）を、ユーザーの環境に登録されているカスタムプロトコルへ変換し、既定のアプリケーションで開くための補助機能を提供します。

ユーザーが UNC パスを選択し、右クリックメニューから専用の項目を選ぶと、拡張機能がそのパスをカスタムプロトコル形式に変換し、ブラウザーから直接開くことができます。これにより、共有フォルダーやファイルへ素早くアクセスでき、業務効率を向上させます。

本拡張機能は、あらかじめ指定された社内ネットワークの URL 上でのみ動作し、ユーザーの明示的な操作（リンクのクリックやメニュー選択）によってのみ機能します。ローカルファイルの内容を読み取ったり、個人情報を収集したり、外部へデータを送信することはありません。使用する権限は「contextMenus」のみで、外部通信は一切行いません。

主な機能:
- 社内ネットワーク上の特定ページにカスタムメニューを追加
- UNC パスをカスタムプロトコルへ変換し、既定のアプリで開く
- 動作対象は内部ネットワークの URL のみに限定
- ユーザー操作時のみ動作
- データ収集・外部送信なし

本拡張機能は社内利用を目的としており、一般公開を意図したものではありません。

# Summary of Changes
## ver1.1.0
### 英語
The following updates were made to improve safety and restrict the extension’s behavior to approved internal network resources only.
These changes do not introduce any data collection, storage, or transmission.
All actions are triggered solely by explicit user interactions.

■ Summary of Changes
1. background.js
- Added IP‑address whitelisting to handleOpenLink.
Only file:// URLs whose hostname matches the approved internal IP list are converted into the custom protocol and opened.
2. content_scripts.js
- Added IP‑address restrictions to the click‑event handler.
Only file:// links pointing to allowed IPs are intercepted and converted.
- Added a new SetLinks function:
- Converts plain‑text UNC paths (e.g., \\server\share\file.txt) into clickable links.
- Links use the custom protocol and do not trigger normal browser navigation.
- Only UNC paths pointing to approved IP addresses are converted.
- The conversion is performed safely using text‑node processing to avoid modifying HTML structure.

### 日本語
以下の更新は、安全性の向上と拡張機能の動作を承認済み内部ネットワークリソースのみに制限するために行われました。
これらの変更により、データの収集、保存、送信は一切行われません。
すべての動作は、明示的なユーザー操作によってのみトリガーされます。

■ 変更点のまとめ
1. background.js
- handleOpenLink に IP アドレスのホワイトリスト機能を追加。
承認済み内部 IP リストとホスト名が一致する file:// URL のみがカスタムプロトコルに変換され開かれます。
2. content_scripts.js
- クリックイベントハンドラにIPアドレス制限を追加。
許可されたIPを指すfile://リンクのみが捕捉・変換されます。
- 新機能SetLinksを追加：
- プレーンテキストのUNCパス（例：\\server\share\file.txt）をクリック可能なリンクに変換。
- リンクはカスタムプロトコルを使用し、通常のブラウザナビゲーションは発生しません。
- 承認済みIPアドレスを指すUNCパスのみが変換対象となります。
- HTML構造を変更しないよう、テキストノード処理を用いた安全な変換を実行します。



# Privacy Policy
## 英語
This extension does not collect, store, or transmit any personal information, browsing data, input content, or file contents. All functionality is triggered solely by explicit user actions such as clicking a link or selecting a context menu item. No communication with external servers is performed.

The only permission used is "contextMenus", and the extension operates exclusively on predefined internal network pages. No processing is performed that could compromise user privacy.

## 日本語
本拡張機能は、ユーザーの個人情報、閲覧データ、入力内容、ファイル内容など、いかなるデータも収集・保存・送信しません。動作はすべてユーザーの明示的な操作（リンクのクリックや右クリックメニューの選択）に基づいて行われ、外部サーバーとの通信も一切行いません。

拡張機能が利用する権限は「contextMenus」のみであり、指定された社内ネットワーク上のページに限定して動作します。ユーザーのプライバシーを侵害する処理は一切行いません。

# Developer Notes
This extension is intended for internal use only.
It does not collect any data and only works when the user manually interacts with a link.
No automatic actions or background communications are performed.

# Support

If you encounter any issues, have questions, or would like to request new features, please use one of the following support channels:

- **GitHub Issues**: [Open an issue here](https://github.com/msmsrep/EdgeExtensionCustomExcuteLink/issues)
- **Email**: support@example.com

### Reporting Issues
When reporting a problem, please include:
- A clear description of the issue
- Steps to reproduce (if applicable)
- Your environment (browser version, OS, etc.)
- Screenshots or logs (if helpful)

### Privacy & Data
This extension does **not** collect, store, or transmit any personal information.  
It operates only on user actions and does not send data externally.

---