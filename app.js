import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(express.json());       
app.use(express.urlencoded({extended: true})); 
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");


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

const todayTodos = [{todoId: 0, todoItem: "item 1"}, {todoId: 1, todoItem: "Item 2"}];
const workTodos = [{todoId: 0, todoItem: "item 1"}, {todoId: 1, todoItem: "Item 2"}];
const buyerTodos = [{todoId: 0, todoItem: "item 1"}, {todoId: 1, todoItem: "Item 2"}];

app.get("/", (req, res)=>{
    res.render(__dirname + "/views/today.ejs", {
        date,
        todayTodos
    })
})

app.get("/work", (req, res)=>{
    res.render(__dirname + "/views/work.ejs",{
        date,
        workTodos
    })
})

app.get("/buyer", (req, res)=>{
    res.render(__dirname + "/views/buyer.ejs",{
        date,
        buyerTodos
    })
})

app.post("/", (req, res) => {
    const inputTodoId = todayTodos.lenght + 1;
    const inputTodoItem = req.body.todoTask;

    todayTodos.push({
        todoId: inputTodoId,
        todoItem: inputTodoItem
    })

    res.render("today", {
        date,
        todayTodos
    });
});

app.post("/work", (req, res) => {
    const inputTodoId = workTodos.lenght + 1;
    const inputTodoItem = req.body.todoTask;

    workTodos.push({
        todoId: inputTodoId,
        todoItem: inputTodoItem
    })

    res.render("work", {
        date,
        workTodos
    });
});

app.post("/buyer", (req, res) => {
    const inputTodoId = buyerTodos.lenght + 1;
    const inputTodoItem = req.body.todoTask;

    buyerTodos.push({
        todoId: inputTodoId,
        todoItem: inputTodoItem
    })

    res.render("buyer", {
        date,
        buyerTodos
    });
});


app.listen(port, ()=>{
    console.log(`server runnning on ${port}`);
})