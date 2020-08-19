const express=require('express');
const path=require('path');
const port=8001;

const db = require('./config/mongoose');
const toDoList = require('./models/to_do_list');


const app = express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded({extended: true}));
app.use(express.static('assets'));

app.get('/',(req,res)=>{
    toDoList.find({},(err,list_items)=>{
        if(err){
            console.log("Error in fetching data");
            return;
        }
        list_items.sort((a,b)=>{
            return a.priority<b.priority;
        });
        return res.render('home',{
            title:"My To Do List",
            to_do_list: list_items
        })
    });
});
app.post('/add-item',(req,res)=>{
    toDoList.create(req.body,(err)=>{
        if(err){
            console.log("error in adding new item");
            return;
        }
        return res.redirect('back');
    });
});


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
app.listen(port,(err)=>{
    if(err){
        console.log("error");
        return;
    }
    console.log("Yup! express server running on port  : ",port);
});