const express = require('express');
const router = express.Router();
const cont = require('./config/conexion');

router.get("/", (req,res)=>{
    res.render("index");
})

router.get('/login', (req, res)=>{
    res.render('login')
})

router.get('/registro', (req, res)=>{
    const deb = cont.query('SELECT * FROM departamento', (error,results) =>{
        if (error){
            throw error;
        }else{
            res.render('registro', {deb:results})
        }
    }); 
})

const auth = require('./controller/auth');
router.post('/sigin', auth.sigin);
router.post('/save', auth.save);


module.exports = router;