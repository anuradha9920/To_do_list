const mongoose = require('mongoose');
//to do list schema
const listSchema = new mongoose.Schema({
    label:{
        type:String,
        required: true
    },
    category:{
        type:String,
        required: true
    },
    priority:{
        type:Number,
        required:true,
        default:6
    },
    dueDate:{
        type:String,
        required:true
    }
});

const toDoList= mongoose.model('toDoList',listSchema);

module.exports = toDoList;