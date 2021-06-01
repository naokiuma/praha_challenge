
const express = require('express')

const app = express()
const port = 3000

app.get('/', (req, res) => {
    
    res.cookie('name1', 'value1', {
        maxAge: 60000,
        httpOnly: false
        })
    
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

//この状態でnode index.jsで起動することでクッキーセットでkた