const mongoose = require('mongoose');

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
        type:Date,
        required:true
    }
});

const toDoList= mongoose.model('toDoList',listSchema);

module.exports = toDoList;