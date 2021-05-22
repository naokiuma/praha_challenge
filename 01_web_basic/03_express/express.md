

# 課題1実装記述コード 
## index.jsファイル。（node file名でサーバー起動しcurlリクエスト可能となります）
```javascript
const express = require('express')
const app = express()
const port = 8080
app.use(express.json())
app.disable('x-powered-by')//x-powered-byを無効に。
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


app.get('/', (req, res) => {
  if(req.query.name) {//ここは課題とは別処理
      res.status(200).json({text: req.query.name})
      
      //自主学習用メモ
      //res.status(200).send("200を返します。" + req.query.name)
      //curl localhost:8080\?name=user1　
      // 結果:200を返します。user1
      //curl -I localhost:8080\?name=user1　
      //ヘッダー情報(http200含む)のみが返ります。
      //curl -i localhost:8080\?name=user1
      //ヘッダー情報とsendのメッセージがかえる


    }else{
      res.status(200).send({text: 'hello world'});
      //課題1-1問目
      //curl localhost:8080 -H "Content-Type: application/json"
      // {text: hello world}

    }
    
})



app.post('/', (req, res) => {
  //req.is(type)
  //受信したリクエストが Content-Type ヘッダを持っているか、
  //また type で指定されたMIMEタイプを持っているかをチェックします。
  if(req.is('application/json'))
    {
    //課題1-2問目 
    console.log(req.body)
    res.status(201).send(req.body);
    //curl localhost:8080 -d '{"name": "hoge"}' -H "Content-Type: application/json"
    //{"name":"hoge"}%  
    }else{
      //課題1-3問目
      res.status(400).send('エラーです');
      //curl localhost:8080 -d '{"name": "hoge"}'
      // HTTPステータス400、エラーが発生するはず
      return; //ここでreturn しないと処理が終わらない
    }
    
  })


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

```

## 動作確認
### それぞれ下記で動作確認済みです！

``` javascript
curl localhost:8080 -H "Content-Type: application/json"
// {text: hello world}が返る


curl localhost:8080 -d '{"name": "hoge"}' -H "Content-Type: application/json"
// {name: hoge}が返る


curl localhost:8080 -d '{"name": "hoge"}'
// HTTPステータス400、エラー
//ただこれは curl -i localhost:8080 -d '{"name": "hoge"}' でヘッダーも返さないとダメでした。
//これでいいのだろうか。。？

```


## わかりやすめの参考記事
https://qiita.com/syumiwohossu/items/f9ee317f31adc3ad387b


# 課題2 （質問）
Content-type/ application/x-www-form-urlencodedを指定すると、
リクエストデータが名前とその値を繋ぐクエリパラメータで送信されます。
例：a=1&b=2

一方application/jsonを指定すると、
文字通りデータがjsonで送信されます。
例{"a" : 1,"b":2}

受け取る側（サーバー側）がそのデータをどう処理しているかによりどちらを使うか選択する必要がありそうです。

# 任意課題クイズ
expressは、デフォルトではスクリプトを記述したファイルの編集、更新をしても、
サーバーの再起動をしないとターミナルで行ったcurlコマンドや、ブラウザ上での表示に反映されません。
再起動をしなくてもスムーズに変更内容を反映する方法（プラグインなど）をあげてください
（色々あると思うので、なにか1つあれば！）



