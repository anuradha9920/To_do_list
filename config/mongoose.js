//required the library
const mongoose = require('mongoose');
//connect to the database
mongoose.connect('mongodb://localhost/to_do_list_db',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});
//acquire the connection (to check if it successfull)
const db = mongoose.connection;
//error
db.on('error',console.error.bind(console,'error in estabishing connection to db'));
//up and running then print the message
db.once('open',()=>{
    console.log("successfully connected to database");
});
