const express=require('express');
const path=require('path');
const port=8001;

const db = require('./config/mongoose');
const toDoList = require('./models/to_do_list');


const app = express();
//seting view engine
app.set('view engine','ejs');
//setting path where to search for views
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded({extended: true}));
app.use(express.static('assets'));

//Months list
var Months={
    "01":"January",
    "02":"Feburary",
    "03":"March",
    "04":"April",
    "05":"May",
    "06":"June",
    "07":"July",
    "08":"August",
    "09":"September",
    "10":"October",
    "11":"November",
    "12":"December"
}
//main home page router
app.get('/',(req,res)=>{
    toDoList.find({},(err,list_items)=>{
        if(err){
            console.log("Error in fetching data");
            return;
        }
        list_items.sort((a,b)=>{
            return a.priority>b.priority;
        });
        return res.render('home',{
            title:"My To Do List",
            to_do_list: list_items
        });
    });
});
//add items router
app.post('/add-item',(req,res)=>{
    let y=req.body.dueDate.substr(0,4);
    let m=req.body.dueDate.substr(5,2);
    let d=req.body.dueDate.substr(8,2);
    m=Months[m];
    req.body.dueDate=m+" "+d+","+y;
    toDoList.create(req.body,(err)=>{
        if(err){
            console.log("error in adding new item");
            return;
        }
        return res.redirect('back');
    });
});

//handle deleting tasks
app.post('/delete_task',(req,res)=>{
    let completedTask=req.body.taskDone;
    if(Array.isArray(completedTask)){
        for(id of completedTask){
            toDoList.findByIdAndDelete(id,(err)=>{
                if(err){
                    console.log("error in deleting task");
                    return;
                }
                console.log("task deleted ");
            })
        }
    }else{
        toDoList.findByIdAndDelete(completedTask,(err)=>{
            if(err){
                console.log("error in deleting task");
                return;
            }
            console.log("task deleted ");
        })
    }
    
    return res.redirect('back');
});

//listening the for client request
app.listen(port,(err)=>{
    if(err){
        console.log("error");
        return;
    }
    console.log("Yup! express server running on port  : ",port);
});