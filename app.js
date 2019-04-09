const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser')

// connect mongoose
mongoose.connect('mongodb://customer:123456#a@ds247078.mlab.com:47078/fbw4', { useNewUrlParser: true})
.then(()=>{
    console.log('MONGO DB Connected.....27017 port');
})
.catch(()=> {
    console.log(' Errors to connect database. bad programmer');
})
app.use(express.static(__dirname + '/public'))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({extend: false}) );

// setup express session
app.use(session({
    secret: 'iamaspy',
    cookie: {
        maxAge: 864001000 // 1 day(1000*60*60*24)
    },
    resave: false,
    saveUninitialized: true
}));

const indexRouter = require('./routes/index');
app.use('', indexRouter);

/**
 * Link
 * Link
 */
app.get('*', (req, res)=> {
    res.send('<h1>404</h1> This is wrong route. Please contact to the owner');
});

app.listen(5000, (req, res)=> {
   console.log(' Server is running on port 5000');
});