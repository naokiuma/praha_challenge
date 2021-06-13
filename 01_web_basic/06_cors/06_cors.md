# 課題1

## 1 CORSとは
CORSとは、「オリジン間リソース共有」の略語です。<br>
通常、異なるオリジン間でのリクエストはセキュリティ上の理由で制限されています（これを同一オリジンポリシーと言います。）が、CORSがあれば異なるオリジンにも通信を行うことができます。<br>
それにより、例えば外部の天気APIからデータを取得しサイトで天気情報一覧を表示するなどといったことが可能です。<br>
<br>
オリジン間リソース共有のパターンとして、<br>
simple requestとpreflight requestがあります。<br>

### 「preflight request」とは
preflight requestは、文字通りフライト（通信）の前に、「今からこういうリクエストを送るが良いか？」と、確認のリクエストを送る処理です。
プリフライトリクエストの例です。<br>
「https://foo.bar.org　というオリジンで、DELETEのリクエストを送ります。」と事前に宣言しています。

```
OPTIONS /resource/foo
Access-Control-Request-Method: DELETE
Access-Control-Request-Headers: origin, x-requested-with
Origin: https://foo.bar.org
```

これを受け、CORSを許可しているサーバーの場合は「Access-Control-Allow-Methods」で「DELETE」を返します。「Access-Control-Allow-Origin」でオリジン名も指定します。
「https://foo.bar.org というオリジンの、DELETEのリクエストを許可します」とレスポンスしている状態です。

```
HTTP/1.1 204 No Content
Connection: keep-alive
Access-Control-Allow-Origin: https://foo.bar.org
Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE
Access-Control-Max-Age: 86400
```

これを受け改めてクライアントはリクエストを送り、通信が実施されます。<br>

### 「simple request 」とは
一方simple request は、名前のとおりシンプルにリクエストを、事前確認なしに送信します。<br>
無条件でリクエストを送り、そのレスポンスによりリソースを受け取れるかを判断する手法です。<br>
条件として、「abc.comというオリジンから、api.abc.comにXHRでリクエストを送った」とします。
この場合送った先のapi.abc.comで<br>
#### Access-Control-Allow-Orijin：http://abc.com 
の設定がされていれば、許可しているオリジンなのでレスポンスを返します。


## 2 Access-Control-Allow-Origin: * この設定が問題となるケースを1つ挙げて、なぜ設定するべきではないのか、説明してください
「Access-Control-Allow-Origin: * 」は、全てのoriginからのアクセスを許可するという設定です。<br>
例えば社内でのみ閲覧可能なサイト「inner.company.com」があり、その社内のユーザーがうっかり悪意のある罠サイトにアクセスしたとします。
罠サイトから「社内サイトinner.company.comの情報を取り出す」というjavascriptが書かれたファイルをダウンロードし、実行された場合、<br>
inner.company.com がAccess-Control-Allow-Origin: * をしていると、スムーズにjsに社内情報を取得できてしまいます。<br>
基本的に重要な情報を持っているサイトへのアクセスは、Access-Control-Allow-Originで信頼できるURLからのアクセスのみ許可するべきです。

## simple requestの条件は
以下の全ての条件を満たすリクエストは、smple requestになります。<br>

・GET、HEAD、POSTのいずれかの<br>
・ユーザーエージェントによって自動的に設定されたヘッダー以外の、手動で設定できるヘッダーは、 以下のヘッダーのみであること<br>

・Accept / Accept-Language / Content-Language /Content-Type (Content-Typeは下記の要件を満たすもの)<br>
application/x-www-form-urlencoded<br>
multipart/form-data<br>
text/plain<br>

・リクエストに使用されるどの XMLHttpRequestUpload にもイベントリスナーが登録されていないこと。<br>

## サーバからのレスポンスのAccess-Control-Allow-Originヘッダーに、リクエスト送信元のオリジンが含まれない場合
ブラウザ側にはCORSセキュリティ上の規則によりブロックされたことがコンソール上に通知されます。

##XMLHttpRequestでクロスオリジンリクエストを行う際、クッキーを含むためにはwithCredentialsの設定が必要です。

```
var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

```

参照：https://qiita.com/kawaz/items/1e51c374b7a13c21b7e2

## クイズ
設定方法


### セキュリティ上の問題とは
無条件でリクエストが送信できてしまうと、CSRF（クロスサイトリクエストフォージェリ）のリスクがあります。
<br>
オリジンとは　httpなどのスキーム、abc.comなどのホスト、80などのポートから構成されます。
<br>
同一オリジンポリシーによりセキュリティ上の安全性がありますが、異なるオリジンのapiを呼び出せないなど、柔軟性がありませんでした。<br>
例としてabc.comからajax.comへXMLHttpRequestを送り、そのリソースを取得しようとしてもこのポリシーによりブロックされてしまいます。<br>
<br>
このような異なるオリジン間のリクエストのやり取りをするために、CORSの設定が生まれました。
CORSは、HTTPヘッダを用いてアクセス制御をコントロールされます。

<br>
メソッドは以下のどれか
get
post
head

設定可能なリクエストヘッダは

Accept
Accept-Language
Content-Language
Content-Type (但し、下記の要件を満たすもの)
    application/x-www-form-urlencoded
    multipart/form-data
    text/plain
DPR
Downlink
Save-Data
Viewport-Width
Width



### 単純リクエスト以外ではpreflight requestを行い、リクエスト送信の許可を得ます。
プリフライト・・・文字通りフライト（通信）の前に、「今からこういうリクエストを送るが良いか？」と、確認のリクエストを送る処理です。

プリフライトリクエストの例です。
「https://foo.bar.org　というオリジンで、DELETEのリクエストを送ります。」と事前に宣言しています。
```
OPTIONS /resource/foo
Access-Control-Request-Method: DELETE
Access-Control-Request-Headers: origin, x-requested-with
Origin: https://foo.bar.org
```
これを受け、CORSを許可しているサーバーは
Access-Control-Allow-Methods　で「DELETE」を返します。Access-Control-Allow-Originでオリジン名も指定します。
「https://foo.bar.org　というオリジンで、DELETEのリクエストを許可します」とレスポンスしている状態です。
```
HTTP/1.1 204 No Content
Connection: keep-alive
Access-Control-Allow-Origin: https://foo.bar.org
Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE
Access-Control-Max-Age: 86400
```
