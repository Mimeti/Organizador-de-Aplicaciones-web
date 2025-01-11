const express = require('express');
const router = express.Router();
const cont = require('./config/conexion');
const auth = require('./controller/auth');
const aplication = require('./controller/aplication');
const fs = require('fs');

//rutas
router.get("/", auth.authentication, (req,res)=>{
    const apps = cont.query('SELECT * FROM aplicacion', (error,results) =>{
        res.render("index", {user:req.NAME_user, apps:results});
    })
    
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

router.get('/add', auth.authentication, (req,res)=>{
    const deb = cont.query('SELECT * FROM departamento', (error,results) =>{
        if (error){
            throw error;
        }else{
            res.render('add', {deb:results, user:req.NAME_user});
        }
    });
})

router.get('/update/:id', auth.authentication, (req, res)=>{
    const {id} = req.params;
    const app = cont.query('SELECT * FROM aplicacion WHERE ID_app = ?', [id], (error,results) =>{
        console.log(results)
        if(error){
            throw error;
        }else{
            res.render('update', {apl:results, user:req.NAME_user});
        }
    })
    
})

router.get('/borrar/:id', auth.authentication, (req, res)=>{
    const ID_app = req.params.id;
    cont.query('SELECT * FROM aplicacion WHERE ID_app =?', [ID_app], (error, result)=>{
        const IMG_old = result[0].IMG_app;
        try {
            fs.unlinkSync('./public/img/'+IMG_old);
            console.log("Delete File successfully.");
            cont.query('DELETE FROM aplicacion WHERE ID_app =?', [ID_app], (error, result)=>{
            if(error){
                throw error;
            }else{
                res.redirect('/');
            }
            })
        } catch (error) {
            throw error;
        }
    })
})

//metodos de controlador
router.post('/sigin', auth.sigin);
router.post('/save', auth.save);
router.get('/logout', auth.logOut);

router.post('/upload', aplication.subida.single('IMG_app') ,aplication.upload);
router.post('/actualizar', aplication.subida.single('IMG_app') ,aplication.actualizar);

module.exports = router;