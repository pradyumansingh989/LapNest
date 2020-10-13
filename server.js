const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
const expressLayout = require('express-ejs-layouts');
const PORT = process.env.PORT || 8000
const mongoose = require('mongoose');


//Database connection
const url = 'mongodb://localhost/LapNest';
mongoose.connect(url, {useNewUrlParser:true, useCreateIndex:true, useUnifiedTopology:true, useFindAndModify:true});
const connection = mongoose.connection;
connection.once('open',()=>{
    console.log('Database Successfully Connected...');
}).catch(err=>{
    console.log('Connection failed..')
});


// Assets
app.use(express.static('public'))

//set template

app.use(expressLayout);
app.set('views', path.join(__dirname,'/resources/views'));
app.set('view engine','ejs');

// require the routes
require('./routes/web')(app)

//server run
app.listen(PORT, () => {
    console.log(`Server is Up and Running on port ${PORT}`);
});