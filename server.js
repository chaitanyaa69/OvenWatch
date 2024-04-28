require('dotenv').config()
const express=require('express');
const app=express();
const ejs=require('ejs')
const mongoose=require('mongoose')
const expressLayout=require('express-ejs-layouts');
const path=require('path');
const session = require('express-session')
const flash=require('express-flash')
const MongoDbStore=require('connect-mongo')(session)

const PORT= process.env.PORT || 3000;
//databse conncection

const url = 'mongodb://localhost/pizza';

mongoose.connect(url);

const connection = mongoose.connection;

connection.on('error', (err) => {
    console.error('DataBase connection failed: ', err);
});

connection.once('open', () => {
    console.log('Connected to the DataBase');
});

const mongoStore = new MongoDbStore({
    mongooseConnection : connection,
    collection: 'sessions',
    //autoRemove: 'interval',
    //autoRemoveInterval: 10 // Removes expired sessions every 10 minutes
});
//session config

app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: mongoStore,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } //24h 
}))

app.use(flash())
app.use(express.static('public'))
app.use(express.json())

//global middleware
app.use((req, res, next) => {
    res.locals.session = req.session
    res.locals.user = req.user
    next()
})
//set template engine

app.use(expressLayout);
app.set('views',path.join(__dirname,'/resources/views'))
app.set('view engine','ejs');

require('./routes/web')(app);
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
});