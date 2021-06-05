
const express = require('express')
const app = express()
const port = 3000

//app.use(express.static('public'));//このようにルート指定（'/'）の外に書いているとここにルーティングされる。
//※この場合クッキーがセットされていない状態

app.get('/', (req, res) => {

  
  res.cookie('third-party', 'cookie', {
    httpOnly: true,
    path:'public',
    domain: 'third-party.com',
    sameSite: "Lax"
  })
  ///このルート内でstaticフォルダをつかいたい場合はstatcファイルの指定は、ここでかけばok
  app.use(express.static('public'));
  res.sendFile(__dirname + '/public/');
})

app.listen(port, () => {
  console.log(`Example app one listening at http://localhost:${port}`)
})



/*
この書き方も可能
const port = 3000
const app = (req,res) => {
  res.cookie('third-party', 'cookie', {
    httpOnly: true,
    path:'public',
    domain: 'third-party.com',
    sameSite: "Lax"
  })
}
app.use(thirdcookie);
app.use(express.static('public'));
app.listen(port, () => {
  console.log(`third_site start http://localhost:${port}`)
})
*/