
const express = require('express');

const app1 = express();
const port1 = 3001;
app1.use(express.static('public1'));

app1.get('/',(req,res) => {
    
    
})

app1.listen(port1,() => {
    console.log(`app1 listening at http://localhost:${port1}`);
})




const app2 = express();
const port2 = 3002;
const cors = require('cors')

const corsOptions = {
    origin: 'http://606e518443da.ngrok.io',
    optionsSuccessStatus: 200 
  }

app2.post('/',cors(corsOptions),(req,res) => {
    //res.header('Access-Control-Allow-Origin',"http://606e518443da.ngrok.io");
    
    res.header('Access-Control-Allow-Methods', 'POST');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type'); //application/json
    res.json({
        message:"これはapp2のapiです。"
    });
})

/*
app2.options('*', function (req, res) {
    res.sendStatus(200);
  });
  */


app2.listen(port2,() => {
    console.log(`app2 listening at http://localhost:${port2}`);
})






/*
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
*/
