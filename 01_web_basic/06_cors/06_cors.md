## 1：CORSとは
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
通常 post : 送信先などが送信先として検証ツールで表示されますが、プリフライトリクエストの通信の場合は options : 送信先となります。

```
OPTIONS /resource/foo　（送信先です。）
Access-Control-Request-Method: DELETE　（メソッドの種類です。）
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



## -----------------------------
## 2：Access-Control-Allow-Origin: * を避けるべき理由
「Access-Control-Allow-Origin: * 」は、全てのoriginからのアクセスを許可するという設定です。<br>
例えば社内でのみ閲覧可能なサイト「inner.company.com」があり、その社内のユーザーがうっかり悪意のある罠サイトにアクセスしたとします。
罠サイトから「社内サイトinner.company.comの情報を取り出す」というjavascriptが書かれたファイルをダウンロードし、実行された場合、<br>
inner.company.com がAccess-Control-Allow-Origin: * をしていると、スムーズにjsで社内情報を取得できてしまいます。<br>
基本的に重要な情報を持っているサイトへのアクセスは、Access-Control-Allow-Originで信頼できるURLからのアクセスのみ許可するべきです。

## -----------------------------
## simple requestの条件
以下の全ての条件を満たすリクエストは、simple requestになります。<br>
<br>
・GET、HEAD、POSTのいずれかのメソッドであること<br>
・（ユーザーエージェントによって自動的に設定されたヘッダー以外の）手動で設定できるヘッダーは、 以下のヘッダーのみであること<br>

・Accept / Accept-Language / Content-Language /Content-Type (Content-Typeは下記の要件を満たすもの)<br>
application/x-www-form-urlencoded<br>
multipart/form-data<br>
text/plain<br>

・リクエストに使用される、どの XMLHttpRequestUpload にもイベントリスナーが登録されていないこと。<br>

## -----------------------------
## サーバからのレスポンスのAccess-Control-Allow-Originヘッダーに、リクエスト送信元のオリジンが含まれない場合・・・
ブラウザ側にはCORSセキュリティ上の規則によりブロックされたことがコンソール上に通知されます。

## -----------------------------
## XMLHttpRequestを使ってクロスオリジンリクエストを発行する際、にクッキー情報を含むためには
クッキーを含むためにはwithCredentialsの設定が必要です。具体的には下記の設定です。

```
var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

```

参照：https://qiita.com/kawaz/items/1e51c374b7a13c21b7e2

## -----------------------------
## クイズ
CORSを使用したリクエストの一種として、webfontの利用があげられます。<br>
https://developer.mozilla.org/ja/docs/Web/HTTP/CORS
の「corsを使用したリクエストとは」参照。<br>
webfontを有償で提供しているサービスはどのような仕組みでユーザーにwebフォントを使ってもらえているのでしょうか。<br>
（サービスにより厳密な仕組みは異なる可能性があるので、概要を考えてみましょう）

## -----------------------------
## プリフライトとシンプルリクエストの実装
public1/index.html・・・シンプルリクエストとプリフライトリクエストをそれぞれのボタンで送信するhtmlファイルです。<br>
index.js・・・この中でexpressで2サーバーを起動。ngrokでそれぞれユニークなURLを割り当てています。<br>
サーバー1が送信元。前述のindex.htmlを表示させています。サーバー2が送信先です。

それぞれ、リクエストを行うことで、シンプルリクエストでは1回の通信、プリフライトでは2回の通信が行われていることを確認いたしました。

## [シンプルリクエスト](./01_web_basic/06_cors/01.png)
## [プリフライトリクエスト](./01_web_basic/06_cors/02.png)


## -----------------------------
## curlでプリフライトリクエスト
下記で実践。（最初のurlの「origin」は送信元、最後のurlは送信先です。）<br>


```
curl  -H "Origin: http://de9c6666b195.ngrok.io" -H "Access-Control-Request-Method: POST"  -H "Access-Control-Request-Headers: Content-Type" -H "Content-Type: application/json" -d '{"Name":"sensuikan1973", "Age":"100"}' http://9685bbb6720e.ngrok.io --verbose
```


でも、
```
curl  -H "Origin: http://example.com" -H "Access-Control-Request-Method: POST"  -H "Access-Control-Request-Headers: Content-Type" -H "Content-Type: application/json" -d '{"Name":"sensuikan1973", "Age":"100"}' http://9685bbb6720e.ngrok.io --verbose   
```

でも、結果は同様に、1度の通信で対象のサーバーのデータを取得できました。（2つの違いは送信元のオリジンの申告を、プリフライトの際に許可されるURL、そうではないURLで変えた点です。）<br>
つまりプリフライトリクエストは実施されなかった状態です。<br>
おそらくですが、「　https://developer.mozilla.org/ja/docs/Glossary/Preflight_request　」によるとプリフライトリクエストは「ブラウザが発行する」物のため、curlからのリクエストではcorsの制約が実施されなかったのではないかと思われます。