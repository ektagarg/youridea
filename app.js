const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const app = express();

//map global promise - get rid of promise warning
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/youridea',{
    useNewUrlParser: true
});

//Middleware handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//index page
app.get('/',(req,res) => {
    const title = "Welcome";
    res.render('index',{
        title:title
    });
});

//About page
app.get('/about',(req,res) => {
    const title = "About";
    res.render('about',{
        title:title
    });
});

const port=5000;


app.listen(port, ()=>{
    console.log(`server is running on ${port}`)
})