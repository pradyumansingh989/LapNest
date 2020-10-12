const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
const expressLayout = require('express-ejs-layouts');
const PORT = process.env.PORT || 8000

app.get('/', function(req,res){
    res.render('home');
})

//set template

app.use(expressLayout);
app.set('views', path.join(__dirname,'/resources/views'));
app.set('view engine','ejs');
app.listen(PORT, () => {
    console.log(`Server is Up and Running on port ${PORT}`);
});