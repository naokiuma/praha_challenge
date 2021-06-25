const express = require('express');
const cacheControl = require('express-cache-controller');
const app = express();
app.use(cacheControl({
    maxAge: 5
}));
const port = 3000;

//


//app.use(express.static('use_cache'));
app.get('/',(req,res) => {
    
    //res.sendFile("./use_cache/index.html");
    res.sendFile(__dirname + '/use_cache/index.html');
    

    console.log(`app1 listening at http://localhost:${port}`);
})


app.use(express.static('no_cache'));
app.get('/no_cache',(req,res) => {
    res.sendFile(__dirname + '/no_cache/index.html');
    res.cacheControl = {
        noStore:true
    };

    console.log(`app2 listening at http://localhost:${port}`);

})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
