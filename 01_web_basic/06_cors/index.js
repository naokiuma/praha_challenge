
const express = require('express');

const app1 = express();
const port1 = 3001;
app1.use(express.static('public1'));

app1.get('/',(req,res) => {
    res.json({
        message:"これは取得できたapiです。"
    });
    
    
})

app1.listen(port1,() => {
    console.log(`app1 listening at http://localhost:${port1}`);
})




const app2 = express();
const port2 = 3002;
const cors = require('cors')


const corsOptions = {
    origin: 'http://f62d1abfa8e8.ngrok.io',
    optionsSuccessStatus: 200 
  }

app2.use(cors(corsOptions))//この指定で完了。

app2.post('/',(req,res) => {    
    res.header('Access-Control-Allow-Methods', 'POST');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type'); //application/json
    res.json({
        message:"これは取得できたapiです。"
    });
})


app2.listen(port2,() => {
    console.log(`app2 listening at http://localhost:${port2}`);
})





