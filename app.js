const express = require('express');
const app = express();
const auth = require('./Routes/auth');
const events = require('./Routes/events');
const port = 3000;
require('dotenv').config();


app.use(express.json());
app.use(express.urlencoded({extended : true}));

const logger = (req,res,next)=>{
    console.log(`${req.method} : Request received on ${req.url}`);
    next();
}

app.use(logger);
app.use(auth);
app.use(events);

app.get('/',(req,res)=>{
    res.send("Virtual Event Management");
});

app.listen(port, (err)=>{
    if(err){
        console.log('Something bad happened ',err);
    }
    console.log(`Server is listening on port ${port}`);
});

module.exports = app;