const express = require('express');
const router = express.Router();

const cont = require('./config/conexion');

//metodos de datos
const login = require('./controller/login');
router.post('/save', login.save);

if(login == true){
    switch(con){
        case 1:
            router.get('/admin', (req,res) =>{
                res.render('admin')
            })
            break;
        default:
            router.get('/user', (req,res) =>{
                res.render('user')
            })
            break;
    }
}

module.exports = router;