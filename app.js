const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");



// settings 

const app = express();


require('dotenv').config();

const PORT = process.env.PORT || 5000;

const SITE = process.env.URL || '*';

const HEADER = process.env.HEADER || ["Upgrade-Insecure-Requests", "1" ];

const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017/SPT';



mongoose.connect(DB_URL, {

    useUnifiedTopology: "true",
  

}, (err) => {
    console.info(`DB is connected`);
});


// mongoose.set('useFindAndModify', false);
// mongoose.set('useCreateIndex', true);

app.use(express.json());

app.options("*" , cors());
app.use(cors({
    origin: SITE,
    optionsSuccessStatus: 202,
    credentials: true,
    maxAge: 1800,
    allowedHeaders: HEADER,
    methods : "GET,HEAD,PUT,PATCH,POST,DELETE"
}));





const path = __dirname + '/public/';

app.use(express.static(__dirname+"/public"));

//static import

let admin = require('./routes/admin.route');

let user = require('./routes/user.route');




//middleware routes
app.use('/admin',admin);
app.use('/user',user)




//port 

app.listen(PORT, () => {

    console.info(`SERVER RUNNING AT ${PORT}`)

})