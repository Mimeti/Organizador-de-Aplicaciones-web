const express = require("express");

import { conexion } from "./config/conexion";

const app = express();




app.set("view engine", "ejs");

app.get("/", function(req,res){
    res.render("index");
})

app.use(express.static("public"))

app.listen(3000, function(){
    console.log("http://localhost:3000");
});