const express = require('express');
const router = express.Router();
const cont = require('./config/conexion');
const auth = require('./controller/auth');

router.get("/", auth.authentication, (req,res)=>{
    res.render("index", {ID_rol:req.ID_rol});
})

router.get('/login', (req, res)=>{
    res.render('login')
})

router.get('/registro', auth.authentication, (req, res)=>{
    const deb = cont.query('SELECT * FROM departamento', (error,results) =>{
        if (error){
            throw error;
        }else{
            res.render('registro', {deb:results})
        }
    }); 
})

router.post('/sigin', auth.sigin);
router.post('/save', auth.save);
router.get('/logout', auth.logOut);


module.exports = router;