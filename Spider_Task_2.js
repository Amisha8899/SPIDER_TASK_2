//jshint esversion:6
const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const { response } = require("express")
const People = require('./Fetch') 
mongoose.connect("mongodb://localhost:27017/SecretSanta",{useNewUrlParser: true})
const app = express()
app.set('view engine',"ejs")
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("spyder_t2.css"))
app.get("/", function(req,res){
    res.sendFile(__dirname+"/SPYDER_TASK2.html")})
const personSchema = new mongoose.Schema({
    rn:Number,
    name: String,
    date: Date,
    email:Number,
    psw: String,
    cpswd: String,})
const Member = mongoose.model("Person",personSchema)
app.post("/",function(request,response){
    var n = request.body.name 
    var d = request.body.date
    var b = request.body.email 
    var p = request.body.psw
    var cp = request.body.cpswd 
    if (n.trim()=="" | b.trim()=="" | p.trim()=="" | cp.trim()=="" | d.trim()==""){
        var head = "Every entry is mandatory...fill all :)GO BACK"
        response.render("index",{content:head })
    }
    if(p!==cp){
        var head = "Confirm the password again...! GO BACK."
        response.render("index",{content: head})
    } 
    else{
    const member = new Member({
        rn:Math.floor(Math.random()*21),
        name: n,
        date: d,
        email: b,
        psw: p,
        cpswd: cp
    })
    member.save()
    var head = "Thanks for registering with us!"
    response.render("index",{content: head})
}
response.redirect("/")
})
app.listen(3000,function(){
console.log("Server started on port 3000.");
})




