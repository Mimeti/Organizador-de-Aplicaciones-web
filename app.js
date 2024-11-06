const express = require("express");

const mysql = require("mysql");

const app = express();

const conexion = mysql.createConnection({
    host: "localhost",
    database: "db_organizador",
    user: "root",
    password: ""
});



app.set("view engine", "ejs");

app.get("/", function(req,res){
    res.render("index");
})

app.use(express.static("public"))

app.listen(3000, function(){
    console.log("http://localhost:3000");
});