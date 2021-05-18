
# 問題1

```js
curl -H "X-Test : hello" https://httpbin.org/headers
```

# 問題2

```js
curl -X POST "https://httpbin.org/post" -H "Content-Type: application/json" --data '{"name":"hoge"}'
```

# 問題3

```js
curl -X POST "https://httpbin.org/post" -H "Content-Type: application/x-www-form-urlencoded" --data '{"name":"hoge"}'
```

# 問題4

```js
curl -X POST "https://httpbin.org/post" -H "Content-Type: application/json" --data '{"userA": "{'name': 'hoge', 'age': 29}" }'

```

# クイズ1
curl -I http://twitter.com をした場合や <br>
curl -I http://www.facebook.com をした場合と比べ、<br>
curl -I http://www.google.com をした場合に返ってこないパラメータはなんでしょう。<br>
また前者2つで返ってきた処理は何を行った結果でしょうか。

# クイズ2
https://www.googleapis.com/plus/v1/people/me/openIdConnect<br>
上記はgoogle APIのURLです。<br>
こちらにpostmanからgetアクセスするとエラーのレスポンスが返ってきます。<br>

・上記レスポンスのエラーの意味<br>
・またエラーではなく正常にアクセスするために必要な情報の種類<br>
・それをpostmanのツール上で設定する箇所の名前（タブ名など）はどこになるでしょうか。<br>


参考
https://www.xlsoft.com/jp/blog/blog/2017/06/23/post-1638/


//shintaniさん
## クイズ

[Q1] curlで`https://jsonplaceholder.typicode.com/todos`を叩いて取得した結果をローカルのテキストファイルに保存してください。

 curl https://jsonplaceholder.typicode.com/todos -o test.js 

 で今いる場所に test.jsというファイルで取得できました！

[Q2] curlで`https://httpbin.org`を叩いてレスポンスタイムを表示してください。

curl https://httpbin.org -o /dev/null -w "response_time:%{time_total}\n" 2> /dev/null -s

-o /dev/null でボディを省略できます。


[Q3] Postmanで環境変数を設定して`https://httpbin.org`を変数に置き換えてリクエストを送信してください。(送信できたらOK)
