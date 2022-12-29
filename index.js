
var express = require('express')

var mongoose = require('mongoose')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()

const port = 3000

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/mydb');
var db = mongoose.connection;

db.on('error',()=>console.log("Error in db connectio"))
db.once('open',()=>console.log("Connected to the database"))
app.post("/signup",(req,res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var pno = req.body.pno;
    var password = req.body.password


var data = {
    "name": name,
    "email": email,
    "pno" : pno,
    "password": password
}

db.collection('sign').insertOne(data,(err,collection)=>{
    if(err)
    {
        throw err;
    }
    console.log("Inserted successfully")
    console.log(`${name} ${email} ${pno} ${password}`)
});

    return res.redirect('signup.html');
})
app.get('/',(req,res)=>{
    res.set({'Allow-access-Allow-Origin':'*'})
    return res.redirect('index.html')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })