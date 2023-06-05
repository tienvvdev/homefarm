const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('./config/database');
const bodyparser = require('body-parser');
const session = require('express-session');
const expressValidator = require('express-validator');
const fileUpload = require('express-fileupload');
const passport = require('passport');


//connection to database
config.connect();


//initializing app
const app = express();
// setting the view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//setting the public folder
app.use(express.static(path.join(__dirname, 'public')));
//setting the router

// set global error variable
app.locals.errors = null;

//get page model
var Page = require('./models/page');

//get all pages to pass to header.ejs
Page.find({}).sort({ sorting: 1 }).exec(function (err, pages) {
    if (err) {
        console.log(err);
    } else {
        app.locals.pages = pages;
    }
})

//Get category model
var Category = require('./models/category');

//get all categories to pass to header.ejs
Category.find(function (err, categories) {
    if (err) {
        console.log(err);
    } else {
        app.locals.categories = categories;
    }
});

//Express fileUpload middlewave
app.use(fileUpload());

//body parser 
app.use(bodyparser.urlencoded({
    extended: false
}));

app.use(bodyparser.json());

//sessions middleware

app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    //  cookie: { secure: true }
}));

// validator middleware

//error: expressValidator is not a function

app.use(expressValidator({
    errorFormatter: function (param, msg, value) {
        var namespace = param.split('.'),
            root = namespace.shift(),
            formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    },
    customValidators: {
        isImage: function (value, filename) {
            var extension = (path.extname(filename)).toLowerCase();
            switch (extension) {
                case '.jpg':
                    return '.jpg';
                case '.png':
                    return '.png';
                case '.jpeg':
                    return '.jpeg';
                case '':
                    return '.jpg';
                default:
                    return false;

            }
        }
    }
}));

// mesaages middleware

app.use(require('connect-flash')());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});

//Passport Config
require('./config/passport') (passport);

//Passport Middlewave
app.use(passport.initialize());
app.use(passport.session());

app.get('*', function (req, res, next) {
    res.locals.cart = req.session.cart;
    res.locals.user = req.user || null;
    next();
})

//set routers
const pages = require('./routes/pages.js');
const products = require('./routes/products.js');
const cart = require('./routes/cart.js');
const users = require('./routes/users.js');
const adminPages = require('./routes/admin_pages.js');
const adminCategories = require('./routes/admin_categories.js');
const adminProducts = require('./routes/admin_products.js');


app.use('/admin/pages', adminPages);
app.use('/admin/categories', adminCategories);
app.use('/admin/products', adminProducts);
app.use('/products', products);
app.use('/cart', cart);
app.use('/users', users);
app.use('/', pages);

//starting the server

const port = 3000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});


