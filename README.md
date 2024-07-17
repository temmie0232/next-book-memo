# BookMemo

読書体験を豊かにする知識整理のためのWebアプリ：本の要点、登場人物、印象的な引用を簡単に記録・整理できるデジタルノート <br>

 - 友達におすすめの本やアニメ、映画などを聞かれたときにどんなに面白かった映画でも思い出せず、おすすめできなかったことがあった
 - 登場人物が多い本(特に推理小説)で、登場人物に関する情報を忘れてしまうことが多かった
 - Notionなどの多機能なアプリだと、そのアプリの機能を十分に使いこなそうという意識から [ 読書メモ → アプリの使い方の勉強 ] のように目的がずれてしまう
 - モダンなWebアプリの開発手法に触れてみたかった

上記の理由から、読んだ本とその本に関する内容などの情報を簡単に記録できるWebアプリを作成した。

## 目標

このプロジェクトの主な目標は、Webアプリケーションを制作することでフロントエンドとバックエンドの役割を理解し、以下の技術を習得することである。

- Next.js 
- React
- Firebase

## 仕様

### 主要技術スタック

- **言語:** TypeScript
- **フレームワーク:** Next.js (Reactベース)

### フロントエンド

#### スタイリング
- CSS Modules
- Tailwind CSS

#### UIコンポーネント
- shadcn/ui (カスタムUIコンポーネントライブラリ)

#### アイコン
- React Icons
- Lucide React

### バックエンド

#### Firebase
- Authentication (認証)
- Firestore (データベース)

### その他のライブラリ

- lodash (ユーティリティ関数)
- react-firebase-hooks (Firebase用Reactフック)



## 機能
### 1. ユーザー認証

#### ログイン機能
- メールアドレスとパスワードによるログイン
- Googleアカウントを使用したソーシャルログイン

#### ユーザー登録
- メールアドレス、パスワード、ユーザー名による新規アカウント作成

#### ログアウト機能

### 2. 本の管理

#### 本の追加
- タイトル、著者、ジャンル、開始日、終了日、読書状態、評価を設定可能
- 必須項目：タイトル、読書状態

#### 本の一覧表示
- ユーザーが追加した全ての本を表示
- 本棚のような視覚的なレイアウトで表示

#### 本の詳細表示
- 各本の詳細情報を表示
- ホバーで簡易情報を表示

#### 本の編集
- 追加した本の情報を後から編集可能

#### 本の削除
- 不要になった本を削除可能

### 3. 読書状態管理

#### 読書状態の設定
- 未読、読書中、完読の3つの状態を設定可能

#### 読書期間の記録
- 読書開始日と終了日を記録可能

#### 評価システム
- 5段階評価で本を評価可能

### 4. ジャンル管理

#### ジャンルの追加
- カスタムジャンルを追加可能

#### ジャンルの削除
- 不要なジャンルを削除可能

#### ジャンルによる本の分類
- 追加した本をジャンルで分類

### 5. 検索・フィルタリング機能

#### 本の検索
- タイトルや著者名で本を検索可能

#### ジャンルフィルター
- 特定のジャンルの本のみを表示

#### 読書状態フィルター
- 未読、読書中、完読の状態で本をフィルタリング

### 6. メモ・コンテンツ管理

#### コンテナ機能
- 本ごとにメモを追加・編集・削除可能
- コンテナの並び替えが可能

#### カスタムエリア
- 重要なメモや登場人物情報を別途記録可能
- タブで切り替え可能な2種類のカスタムエリア

### 7. UI/UX機能

#### ダークモード
- ライト/ダークテーマの切り替えが可能

#### レスポンシブデザイン
- さまざまな画面サイズに対応 

### 8. データ管理

#### リアルタイム同期
- Firebaseを使用したリアルタイムデータ同期

### 9. その他の機能

#### サンプルデータ
- 新規ユーザー向けのサンプルデータ提供機能

