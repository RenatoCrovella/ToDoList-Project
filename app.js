import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

const port = 3000;

app.get("/", (req, res)=>{
    res.render(__dirname + "/views/today.ejs")
})

app.get("/work", (req, res)=>{
    res.sendFile(__dirname + "/views/work.ejs")
})

app.get("/buyer", (req, res)=>{
    res.sendFile(__dirname + "/views/buyer.ejs")
})

app.listen(port, ()=>{
    console.log(`server runnning on ${port}`);
})