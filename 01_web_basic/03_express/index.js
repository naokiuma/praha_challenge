/*
const express = require('express')
const app = express()
const port = 8080
app.use(express.json())
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.post('/', function (req, res) {
    res.json(req.body)
    res.send('Got a POST request')
  })
  //https://expressjs.com/ja/api.html#req.body
  
  app.listen(port, () => console.log('Example app listening on port 3000!'))
*/

const express = require('express')
const app = express()
const port = 3000
app.use(express.json())
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

/*
app.get('/', (req, res) => {
  res.json(req.body)
  res.send('アクセスできました！')
})
*/

app.post('/', (req, res) => {
    res.send('Hello World!')
  })


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


