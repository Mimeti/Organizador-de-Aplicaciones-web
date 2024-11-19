const express = require('express');
const app = express();

app.set("view engine", "ejs");

app.use('/', require('./router'));

app.get("/", function(req,res){
    res.render("index");
})

//servidor
app.listen(3000, function(){
    console.log("http://localhost:3000");
});