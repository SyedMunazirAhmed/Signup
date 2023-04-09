var express = require('express')

var mongoose = require('mongoose')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()

const port = process.env.PORT || 3000;

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb+srv://munazir:munazirahmed17@cluster0.xeqjlaz.mongodb.net/?retryWrites=true&w=majority');
var db = mongoose.connection;

db.on('error',()=>console.log("Error in db connectio"))
db.once('open',()=>console.log("Connected to the database"))
app.post("/sign",(req,res)=>{
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var email = req.body.email;
    var password = req.body.pswrd;
    


var data = {
    "fname": firstname,
    "lname": lastname,
    "email": email,
    "pswrd" : password
}

db.collection('sign').insertOne(data,(err,collection)=>{
    if(err)
    {
        throw err;
    }
    console.log("Inserted successfully")
    
});

    return res.redirect('/signup.html');
})
app.get('/',(req,res)=>{
    res.set({'Allow-access-Allow-Origin':'*'})
    return res.redirect('index.html')
})

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
  })