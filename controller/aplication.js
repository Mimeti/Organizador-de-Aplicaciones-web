const { error, time } = require('console');
const conexion = require('../config/conexion');
const multer = require('multer');
const fs = require('fs');
const {promisify} = require('util');
const { title } = require('process');
const { text } = require('stream/consumers');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/img/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

exports.subida = multer({storage})

exports.upload =  (req, res) =>{
    const NAME_app = req.body.NAME_app;
    const URL_app = req.body.URL_app;
    const ID_deb = req.body.ID_deb;
    const IMG_app = req.file.filename;
    if(IMG_app && NAME_app  && URL_app  && ID_deb){
        conexion.query('SELECT * FROM aplicacion WHERE NAME_app = ? OR IMG_app =?', [NAME_app, IMG_app], async(error, result)=>{
            if(result.length != 0){
                res.render("add",{
                    deb:"", 
                    user: "", 
                    alert:"true",
                    title: "Aplicacion",
                    text: "El nombre o icono de la aplicacion y existen. Cambielos e intente de nuevo",
                    icon: "error",
                    timer: 1500,
                    ruta: "add"
                })
            }else{
                conexion.query('INSERT INTO aplicacion SET ?', {NAME_app:NAME_app, URL_app:URL_app, IMG_app:IMG_app, ID_deb:ID_deb}, async(error, result)=>{
                    if(error){
                        throw error;
                    }else{
                        res.render("add",{
                            deb:"", 
                            user: "", 
                            alert:"true",
                            title: "Aplicacion",
                            text: "Aplicacion registrada exitosamente",
                            icon: "success",
                            timer: 1500,
                            ruta: ""
                        })
                    }
                })
            }
        })
    }else{
        res.render("add",{
            deb:"", 
            user: "", 
            alert:"true",
            title: "Aplicacion",
            text: "Debe ingresar todos los datos",
            icon: "error",
            timer: 1500,
            ruta: "app"
        })
    }
} 

exports.actualizar = (req, res) =>{
    const ID_app = req.body.ID_app;
    const IMG_old = req.body.IMG_old;
    const NAME_app = req.body.NAME_app;
    const URL_app = req.body.URL_app;
    const img = req.file;
    console.log(img);
    if (img){
        try {
            const IMG_app = req.file.filename;
            fs.unlinkSync('./public/img/'+IMG_old);
            console.log("Delete File successfully.");
            conexion.query('UPDATE aplicacion SET NAME_app =?, URL_app =?, IMG_app =? WHERE ID_app =?', [NAME_app, URL_app, IMG_app, ID_app], (error, result)=>{
                if(error){
                    throw error;
                }else{
                    res.redirect('/');
                }
            })
        } catch (error) {
            console.log(error);
        }
    }else{
        const IMG_app = IMG_old;
        conexion.query('UPDATE aplicacion SET NAME_app =?, URL_app =?, IMG_app =? WHERE ID_app =?', [NAME_app, URL_app, IMG_app, ID_app], (error, result)=>{
            if(error){
                throw error;
            }else{
                res.redirect('/');
            }
        })
    }
}