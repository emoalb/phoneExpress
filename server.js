const express = require('express');
const hbs = require('express-handlebars');
const http = require('http');
const path = require('path');
const controller = require('./routes/index');
const expressSession = require('express-session');
const indexRouter = require('./routes/index');
const createRouter = require('./routes/create');

const database = require('./config/db');

const app = express();
const title = "phone-book";
const rootFolder = path.normalize(__dirname);
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: __dirname + '/views/layouts/',

    helpers: {
        title: title,
        cname: 'Emkosoft Corporation',
        year: '2018'
    },
    partialsDir: __dirname + '/views/partials/'
}));
app.set('view engine', 'hbs');
app.use(expressSession({
    secret: 'NUCLEAR_SECRET',
    resave: false,
    saveUninitialized: true
}));

app.get('/', controller.home.get);
app.get('/create/new', controller.create.get);
app.post('/create/new', controller.create.post);
app.get('/search', controller.search.get);
app.post('/search', controller.search.post);
app.get('/edit/:id', controller.edit.get);
app.post('/edit/:id', controller.edit.post);
app.get('/delete/:id', controller.delete.get);
app.get('/user/login', controller.login.get);
app.get('/user/register', controller.register.get);
app.post('/user/login', controller.login.post);
app.post('/user/register', controller.register.post);
app.get('/user/logout', controller.logout.get);


app.use(express.static(path.join(rootFolder, 'node_modules/bootstrap/dist')));
app.use(express.static(path.join(rootFolder, 'public')));
const port = 5000;
database();
const server = http.createServer(app);
server.listen(port);
console.log("Running on http://localhost:" + port);