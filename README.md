## 概要
 Node.jsの学習として、以下の要件で作成しました。
 - 簡易なWebAPIとして動作すること
 - データベースをORMツールを介して利用する
   - 直でSQLを発行しない
   - Seederを用意して初期化をする
 - Model/Controller/View(今回は未使用)の構造を順守する

### 使用ツール
 - Express.js(Webアプリフレームワーク)
 - Prisma(ORM)
 - jsonsonwebtoken(JWT)
 - VSCodeの機能拡張
   - REST Client 
     - test.http が同ツールでのテスト記述になります。


### DBの初期化(migrate/seeding/DBクライアント生成)
```
npx prisma migrate dev
npx prisma db seed
npx prisma db pull
npx prisma generate

```

### 利用方法

#### 1：アクセストークンの取得(ログイン)
 - メソッド: POST
 - エンドポイント: /auth/login
##### リクエスト(JSON)
 ``` json
{
    "user": "(有効なユーザー名)",
    "password": "(パスワード)"
}
 ```
- seederで追加されるユーザー名：Alice / John / Yumi
- seederで設定されるパスワード：password

##### レスポンス(JSON)
```json
{
  "token": "(発行されたアクセストークン)"
}
```
#### 2：データの取得(ログインが必要なコンテンツを想定)
 - メソッド: GET
 - エンドポイント: /protected
##### リクエストヘッダ
 ``` shell
 Authorization: Bearer (1で取得したアクセストークン)
 ```
##### レスポンス(JSON)
```json
①アクセストークンが有効な場合は下記メッセージが返却されます。
{
  "message": "protected contents."
}
```