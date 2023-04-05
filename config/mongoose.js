const mongoose = require('mongoose');
// establishing connection
mongoose.connect('mongodb+srv://sibu:221997@sibananda.j2qis.mongodb.net/issueTracker?retryWrites=true&w=majority');
mongoose.set('strictQuery', true);
// acquiring connection
const db = mongoose.connection;

// if any error occur
db.on('error', console.error.bind(console, 'Error in connecting to the db'));
// when db is connected
db.once('open', function(){
    console.log('Connected to the database: Mongodb');
})
// exporting connection
module.exports=db;