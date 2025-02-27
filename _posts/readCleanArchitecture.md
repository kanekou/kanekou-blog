---
title: "クリーンアーキテクチャを読了しました"
excerpt: "クリーンアーキテクチャを読了したので、感想を書きます"
coverImage: "/assets/blog/readCleanArchitecture/cover.png"
date: "2025-01-05"
ogImage:
  url: "/assets/blog/readCleanArchitecture/cover.png"
tags:
  - "読書メモ"
---

## 目次

## はじめに

あけましておめでとうございます。新年 1 発目の記事となります。

クリーンアーキテクチャを読了したので、感想を書いていきます。

クリーンアーキテクチャは、2012 年にロバート・C・マーティン氏(通称ボブおじさん)によって提唱されたアーキテクチャです。ソフトウェアのコアロジックを、フレームワークや DB といった外部層への依存性から解放し、変更に強いシステムを実現するアーキテクチャとなります。

https://www.amazon.co.jp/Clean-Architecture-%E9%81%94%E4%BA%BA%E3%81%AB%E5%AD%A6%E3%81%B6%E3%82%BD%E3%83%95%E3%83%88%E3%82%A6%E3%82%A7%E3%82%A2%E3%81%AE%E6%A7%8B%E9%80%A0%E3%81%A8%E8%A8%AD%E8%A8%88-Robert-C-Martin/dp/4048930656

## プログラミングパラダイム

まず良いなと思った点が、3 つのプログラミングパライダイムをおさらいできたことです。

第 4 章の構造化プログラミングでは、構造化プログラミングの基本要素である「順序」「選択」「繰り返し」「機能分割」について、歴史を振り返りながら学びました。これまで、コーディングでは機能分割を当然のように扱ってきましたが、その背景には長い年月をかけ理論として確立された過程があることを知りました。また、テストの反証可能性の話は数学と科学の違いを知ることができ興味深かったです。

5 章のオブジェクト指向プログラミングでは、オブジェクト指向を構成する 3 つの要素に触れた後、ポリモーフィズムの重要性について語られています。特に、クリーンアーキテクチャで重要となる「依存関係の逆転」において、ポリモーフィズムが真価を発揮することを学びました。興味深いことに、著者はポリモーフィズム以外の 2 つの要素をあまり重要視していないようでした。また、C 言語を使ってオブジェクト指向の 3 つの要素を再現する方法の説明は、プログラミングの歴史を感じられ面白かったです。

第 6 章では、関数型プログラミングにおけるイベントソーシングの考え方を学びました。すべてのトランザクションを保存するという視点は非常に興味深く、新鮮でした。関数型は今年こそ何か一言語を通して学び、不変性を意識したコーディング能力をつけていきたいと考えています。

## SOLID 原則

プログラミングの設計原則である SOLID 原則について詳細に学べたことは、大きな収穫でした。恥ずかしながら私は単一責任以外の SOLID 原則を意識できていなかったため、とても勉強になりました。単一責任の原則についても、どの単位で「単一責任」を考えるべきかが曖昧でしたが、「アクター単位」での切り分け方法を学ぶことができました。本で指摘されているように、実装背景が異なる処理でも、似ているからという理由で同じ関数にまとめてしまいがちだなあと思いました。このアンチパターンを避けるよう、意識していきたいです。

依存性逆転の原則は、コンポーネント間の依存関係を管理する上で最も重要な原則だと感じました。インターフェースを用いてアーキテクチャの境界線を定義できることで、コードの変更容易性、テストコードの書きやすさ、可読性が向上します。また、読み進めるうちにオブジェクト指向におけるポリモーフィズムとの関連性に気づき、点と点が繋がった感覚になりました。

最近は仕事でバックエンドのコードを書く機会があるのですが、依存性逆転を意識してコーディングすることで、テストが書きやすい構成を実現でき、その効果を実感しています。これまでフロントエンド開発をしてきて全く意識していなかった原則だったので、学べて本当によかったです。

SOLID 原則は全体的に、一度読んだだけでは十分な理解には至らないと感じたため、実際にコードを書きながら身につけていこうと思います。

## コンポーネントの凝縮性

REP(再利用化のためのグループ化)、CCP(保守性のためのグループ化)、CRP(不要なリリース作業を減らすための分割)のバランスを取るために適切なコンポーネントを分割する作業が相当難しい印象を受けました。ビジネスの状況や、チームの状況でも変わるためです。

## アーキテクチャ

アーキテクチャの章では、「選択肢を残すこと」の重要性が一貫して強調されており、とても印象的でした。これまで、アプリケーションはフレームワーク（FW）、データベース（DB）、Web サーバーなどが前提として構成が組まれるものだと思っていたので、この考え方は新鮮でした。

「選択肢を残す」ためには、データベースやフレームワークを「詳細」に分類し、アプリケーションの核となるビジネスロジックがこれらに依存しないように設計することが重要だと説明されていました。この基本的な構成方法が丁寧に解説されていて、とても勉強になりました。

ただ、内容自体は少し難しく感じました。そのため、実際にプログラムを書きながら本を何度も読み返すことで理解を深めていく必要があると感じています（すでに難しいと感じたので、実際に現場で使いこなすにはかなりの経験が必要そうです）。

## 総評

特に勉強になったのは、クリーンアーキテクチャの基礎となる「プログラミングパラダイム」や「SOLID 原則」、そして「コンポーネントの凝縮性」に関する部分でした。この本では、クリーンアーキテクチャだけでなく、プログラミング全体の基本的な知識も学べるため、エンジニア初心者にもおすすめできる内容だと思います。

クリーンアーキテクチャ自体は応用的で難しく感じたので、実際にコードを書きながら慣れていく必要があると感じました。まずは自作アプリに取り入れながら、少しずつ実践を通して身につけていきたいです。
