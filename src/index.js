const express = require('express');
const path = require('path');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore  = require('connect-mongodb-session')(session);
const flash = require('express-flash');

hbs.registerHelper('dateFormat', require('handlebars-dateformat'));

// mongoose connection
const mongoUri = 'mongodb://localhost:27017/services-app';
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('>>> DataBase Connected <<<')
}).catch((err) => {
    console.log(err.message)
});

// Define Port or run Express;
const app = express();
const Port = 8500;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// for static files
app.use(express.static(path.join(__dirname, 'public')));

// set view emgine and path of views file
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'public/views'));

const mongoStore = new MongoDBStore({
    uri:mongoUri,
    collection: 'sessions'
});

app.use(session({
    secret: 'key101',
    store:mongoStore,
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 1000 * 60 * 60 * 24},
}));

app.use(flash());

app.use((req, res, next) => {
    res.locals.session = req.session;
    res.locals.user = req.session.token;
    res.locals.userName = req.session.name;
    res.locals.role = req.session.role;
    next();
})

const webRoutes = require('./routes/webRoutes');
const adminRoutes = require('./routes/adminRoutes');

app.use('/', webRoutes);
app.use('/admin', adminRoutes);

app.listen(Port, () => {
    console.log(`sarver on http://localhost:${Port}`)
});