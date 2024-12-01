const express = require('express');
const cookie = require('cookie-parser');
const dotenv = require('dotenv');
const app = express();

//definir view engine
app.set("view engine", "ejs");

//invocar dotenv
dotenv.config({path:'./env/.env'});

//cookie
//app.use(cookie());

//obtener datos
app.use(express.urlencoded({extended:false}));
app.use(express(JSON));

//recursos estaticos
app.use('/resources', express.static('public'));
app.use('/resources', express.static(__dirname + '/public'));

app.use('/', require('./router'));

//servidor
app.listen(3000, function(){
    console.log("http://localhost:3000");
});