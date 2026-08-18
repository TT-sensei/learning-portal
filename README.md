# TT-sensei 学びのポータル

TT-senseiが作成した小学校向けの学習サイト・教室ツール・教材制作素材と、対応するGitHubリポジトリをまとめるポータルサイトです。

## 公開ページ

[GitHub Pagesで公開しています](https://tt-sensei.github.io/learning-portal/)。

- 教材・ツール・素材のカテゴリ分け
- 国語・算数・理科・社会などの教科フィルター
- サイト名・内容・リポジトリ名の検索
- 各項目の公開サイトとGitHubリポジトリへのリンク
- 教材制作共通基盤（edu-components / edu-effects / sounds-recipe- / edu-assets）への導線
- 前回の検索・絞り込み条件の保存

正しい漢字小テスト（`kanji_syotest`）は掲載していません。

## デザイン

[デジタル庁デザインシステム](https://design.digital.go.jp/)を参考に、情報の見つけやすさ、読みやすさ、コントラスト、キーボード操作時のフォーカス表示を意識しています。

## 開発

HTML / CSS / JavaScriptのみで構成しています。UIの基本部品は `edu-effects`、絞り込み条件の保存は `edu-components` の `StorageManager` を利用しています。
