---
title: "サンプルページ"
excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Praesent elementum facilisis leo vel fringilla est ullamcorper eget. At imperdiet dui accumsan sit amet nulla facilities morbi tempus."
coverImage: "/assets/blog/hello-world/cover.jpg"
date: "2024-07-23T05:35:07.322Z"
author:
  name: Tim Neutkens
  picture: "/assets/blog/authors/tim.jpeg"
ogImage:
  url: "/assets/blog/hello-world/cover.jpg"
tags:
  - "tag1"
  - "tag2"
---

# 見出し

```
# 見出し1
## 見出し2
### 見出し3
#### 見出し4
```

# リスト

```
- Hello!
- Hola!
  - Bonjour!
  * Hi!
```

- Hello!
- Hola!
  - Bonjour!
  * Hi!

## 番号付きリスト

```
1. First
2. Second
```

1. First
2. Second

# テキストリンク

```
[アンカーテキスト](リンクのURL)
```

[youtube](https://www.youtube.com/)

# 画像

```
![altテキスト](https://画像のURL)
```

![altテキスト](https://storage.googleapis.com/zenn-user-upload/gxnwu3br83nsbqs873uibiy6fd43)

## 画像にリンクを貼る

以下のようにすることで画像に対してリンクを貼ることもできます。

```
[![altテキスト](画像のURL)](リンクのURL)
```

[![altテキスト](https://storage.googleapis.com/zenn-user-upload/gxnwu3br83nsbqs873uibiy6fd43)](https://www.youtube.com/)

# テーブル

```
| Head | Head | Head |
| ---- | ---- | ---- |
| Text | Text | Text |
| Text | Text | Text |
```

| Head | Head | Head |
| ---- | ---- | ---- |
| Text | Text | Text |
| Text | Text | Text |

# コードブロック

<!-- コードは「```」で挟むことでブロックとして挿入できます。以下のように言語を指定するとコードへ装飾（シンタックスハイライト）が適用されます。

> \```js
>
> \```

```js
const great = () => {
  console.log("Awesome");
};
``` -->

## ファイル名を表示する

`言語:ファイル名`と`:`区切りで記載することで、ファイル名がコードブロックの上部に表示されるようになります。シンタックスハイライトも適応されます。

> \```ファイル名
>
> \```

```js:fooBar.js
const great = () => {
  console.log("Awesome")
}
```

# 引用

```
> 引用文
```

> 引用文

# 注釈

注釈を指定するとページ下部にその内容が表示されます。

```
脚注の例[^1]です。インライン^[脚注の内容その2]で書くこともできます。

[^1]: 脚注の内容その1
```

脚注の例[^1]です。インライン^[脚注の内容その 2]で書くこともできます。

[^1]: 脚注の内容その 1

# 区切り線

```
-----
```

---

# インラインスタイル

```
*イタリック*
**太字**
~~打ち消し線~~
インラインで`code`を挿入する
```

_イタリック_
**太字**
~~打ち消し線~~
インラインで`code`を挿入する

## インラインのコメント

自分用のメモをしたいときは HTML のコメント記法を使用できます。

```html
<!-- TODO: ◯◯について追記する -->
```

<!-- コメントテスト
あああ
 -->

この形式で書いたコメントは公開されたページ上では表示されません。
