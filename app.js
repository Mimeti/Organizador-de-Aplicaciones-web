const express = require('express');
const app = express();

//definir view engine
app.set("view engine", "ejs");

//invocar dotenv
const dotenv = require('dotenv');
dotenv.config({path:'./env/.env'});

//obtener datos
app.use(express.urlencoded({extended:false}));
app.use(express(JSON));

//recursos estaticos
app.use('/resources', express.static('public'));
app.use('/resources', express.static(__dirname + '/public'));

//encriptacion de contraseña
const cryp = require('bcryptjs');

//variable de sesion
const sesion = require('express-session');
app.use(sesion({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

//bd
const conn = require('./config/conexion') 

app.use('/', require('./router'));

app.get("/", function(req,res){
    res.render("index");
})

//servidor
app.listen(3000, function(){
    console.log("http://localhost:3000");
});