
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


参考
https://www.xlsoft.com/jp/blog/blog/2017/06/23/post-1638/
