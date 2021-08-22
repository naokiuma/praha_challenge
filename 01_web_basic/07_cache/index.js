const express = require('express');
const cacheControl = require('express-cache-controller');
const app = express();
app.use(cacheControl({ maxAge: 0 }));
const port = 3000;


app.get('/',(req,res) => {
    app.use(express.static('use_cache'));
    res.cacheControl = {
        maxAge:15555000,
        public:true
    };
    console.log(`キャッシュ利用 at http://localhost:${port}`);
    res.sendFile(__dirname + '/use_cache/index.html');

})



app.get('/no_cache',(req,res) => {
    app.use(express.static('no_cache'));
    res.cacheControl = {
        noStore:true
    };

    console.log(`キャッシュ利用せず http://localhost:${port}`);
    res.sendFile(__dirname + '/no_cache/index.html');


})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
