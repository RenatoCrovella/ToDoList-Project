import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(express.json());       
app.use(express.urlencoded({extended: true})); 
app.use(express.static("public"));

const port = 3000;

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January","February","March","April",
"May","June","July","August",
"September","October","November","December"]
const _month = months[new Date().getMonth()];
const _day = days[new Date().getDay()];
const _year = new Date().getFullYear();
const date = {
    year: _year,
    month: _month,
    dayNumber: new Date().getDay(),
    day: _day
}

app.get("/", (req, res)=>{
    res.render(__dirname + "/views/today.ejs", date)
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