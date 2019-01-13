const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();

//load routes
const ideas = require('./routes/ideas');
const users = require('./routes/users');

//map global promise - get rid of promise warning
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/youridea-dev', {
    useNewUrlParser: true
})
    .then(() => console.log("Mongo DB Connected ..."))
    .catch(err => console.log(err));
 

//Middleware handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//path folder
app.use(express.static(path.join(__dirname,'public')));

// method-override middleware
app.use(methodOverride('_method'));

//session middleware
app.use(session({
    secret: 'session',
    resave: true,
    saveUninitialized: true
}))

app.use(flash());

//global variables
app.use(function(req,res,next){
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
    next();
})



//index page
app.get('/', (req, res) => {
    const title = "Welcome";
    res.render('index', {
        title: title
    });


});

//About page
app.get('/about', (req, res) => {
    const title = "About";
    res.render('about', {
        title: title
    });
});

app.use('/ideas', ideas);
app.use('/users', users);

const port = 5000;


app.listen(port, () => {
    console.log(`server is running on ${port}`)
})