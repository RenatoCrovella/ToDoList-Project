const express = require("express");

const app = express();

const port = 3000;

app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/views/today.ejs")
})

app.get("/work", (req, res)=>{
    res.sendFile(__dirname + "/views/work.ejs")
})

app.get("/buyer", (req, res)=>{
    res.sendFile(__dirname + "/views/buyer.ejs")
})

app.listen(port, (req, res)=>{
    console.log(`server runnning on ${port}`);
})