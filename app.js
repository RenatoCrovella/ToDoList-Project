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

//let todoActivity = {todoId: 0 , todoItem: "item", completed: false};

const todayTodos = [{todoId: 0, todoItem: "item 1", completed: false}, {todoId: 1, todoItem: "Item 2", completed: false}];
const workTodos = [{todoId: 0, todoItem: "item 1", completed: false}, {todoId: 1, todoItem: "Item 2", completed: false}];
const buyerTodos = [{todoId: 0, todoItem: "item 1", completed: false}, {todoId: 1, todoItem: "Item 2", completed: false}];

app.get("/", (req, res) => {
    res.render(__dirname + "/views/today.ejs", {
        date,
        todayTodos
    });
});

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
    const inputTodoId = todayTodos.length; // Update the calculation here
    const inputTodoItem = req.body.todoTask;

    todayTodos.push({
        todoId: inputTodoId,
        todoItem: inputTodoItem,
        completed: false // Set the completed value to false for the new item
    });

    res.redirect("/");
});

app.post("/work", (req, res) => {
    const inputTodoId = workTodos.length; // Update the calculation here
    const inputTodoItem = req.body.todoTask;

    workTodos.push({
        todoId: inputTodoId,
        todoItem: inputTodoItem,
        completed: false // Set the completed value to false for the new item
    });

    res.redirect("/work");
});

app.post("/buyer", (req, res) => {
    const inputTodoId = buyerTodos.length; // Update the calculation here
    const inputTodoItem = req.body.todoTask;

    buyerTodos.push({
        todoId: inputTodoId,
        todoItem: inputTodoItem,
        completed: false // Set the completed value to false for the new item
    });

    res.redirect("/buyer");
});

app.post("/toggleCheckbox", (req, res) => {
    const listName = req.body.listName;
    const itemId = req.body.itemId;
    const itemStatus = req.body.completed;
    let selectedList = null;

    let whereToReturn = null;

    switch(listName){
        case "todayTodos":
            whereToReturn = "/";
            selectedList = todayTodos;
            console.log(todayTodos);
            break;
        case "workTodos":
            whereToReturn = "/work";
            selectedList = workTodos;
            break;
        case "buyerTodos":
            whereToReturn = "/buyer";
            selectedList = buyerTodos;
            break;
        default:
            console.log("Invalid list name");
            return;
    }

    const itemToUpdate = selectedList.find(task => task.todoId == itemId);
    if (itemToUpdate) {
        itemToUpdate.completed = itemStatus;
    } else {
        console.log("Item not found");
    }

    res.json({ success: true, selectedList });
})

app.listen(port, ()=>{
    console.log(`server runnning on ${port}`);
})