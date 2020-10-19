require('dotenv').config();
const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
const expressLayout = require('express-ejs-layouts');
const PORT = process.env.PORT || 8000
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('express-flash');
const MongoDbStore = require('connect-mongo')(session); //passing session
const passport = require('passport')

//Database connection
const url = 'mongodb://localhost/LapNest';
mongoose.connect(url, {useNewUrlParser:true, useCreateIndex:true, useUnifiedTopology:true, useFindAndModify:true});
const connection = mongoose.connection;
connection.once('open',()=>{
    console.log('Database Successfully Connected...');
}).catch(err=>{
    console.log('Connection failed..')
});


//session store
let mongoStore = new MongoDbStore({
    mongooseConnection: connection,
    collection: 'sessions'
})
//session config
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: mongoStore,
    saveUninitialized:false,
    cookie: {maxAge: 1000 * 60 * 60 * 24} //24hrs
}))

//passport config
const passportInit = require('./app/config/passport');
const { request } = require('http');
const Server = require('socket.io');
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())


app.use(flash());
// Assets
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Global Middleware
app.use((req,res,next)=>{
    res.locals.session = req.session
    res.locals.user = req.user
    next()
})

//set template

app.use(expressLayout);
app.set('views', path.join(__dirname,'/resources/views'));
app.set('view engine','ejs');

// require the routes
require('./routes/web')(app)

//server run
const server =  app.listen(PORT, () => {
    console.log(`Server is Up and Running on port ${PORT}`);
});


//Socket

const io = require('socket.io')(server)
io.on('connection',(socket) => {
    // Join
    console.log(socket.id);
    socket.on('join',(roomName) => {
        console.log(roomName)
        socket.join(roomName)
    })
})