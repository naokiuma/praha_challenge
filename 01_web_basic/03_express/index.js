const express = require('express')
const app = express()
const port = 8080
app.use(express.json())
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


app.get('/', (req, res) => {
  //res.send("hello")
  if(req.query.name) {
      res.status(200).json({text: req.query.name})

      //自主学習用メモ
      //res.status(200).send("200を返します。" + req.query.name)
      //　curl localhost:8080\?name=user1　
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

//静的ファイル表示テスト
app.get('/public',(req,res) => {
  res.sendFile(__dirname + '/public/index.html');//dirnameはルート
})


app.post('/', (req, res) => {
  //req.is(type)
  //受信したリクエストが Content-Type ヘッダを持っているか、
  //また type で指定されたMIMEタイプを持っているかをチェックします。
  if(req.is('application/json'))
    {
    //課題1-2問目の処理
    console.log(req.body)
    res.status(201).send(req.body);
    }else{
      //課題1-3問目の処理
      res.status(400).send('エラーです');
      return; 
    }
    
  })




  //起動
app.listen(port, () => {
  console.log(`サーバー起動します。 http://localhost:${port}`)
})


