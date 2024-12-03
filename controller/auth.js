const conexion = require('../config/conexion');
const cryp = require('bcryptjs');
const {promisify} = require('util');
const jwt = require('jsonwebtoken');
const { error } = require('console');

exports.sigin = async (req, res) => {
    const NAME_user = req.body.user;
    const password = req.body.pass;
    const ID_deb = req.body.ID_deb;
    let CONT_user = await cryp.hash(password, 8);
    
    if(NAME_user && password && ID_deb){
        conexion.query('INSERT INTO usuario SET ?', {NAME_user:NAME_user, CONT_user:CONT_user, ID_deb:ID_deb}, async(error, result) =>{
            if(error){
                console.log(error);
            }else{
                res.send('se logro');
            }
        })
    }else{
        res.send('todo mal');
    }
}

exports.save = async (req, res) =>{
    const user = req.body.user;
    const password = req.body.password;
    let passhash = await cryp.hash(password, 8);
    if(user && password){
        conexion.query('SELECT * FROM usuario WHERE NAME_user = ?', [user], async(error, results)=>{
            if(results.length == 0 || !(await cryp.compare(password, results[0].CONT_user))){
                res.send('no existes pa');
            }else{
                const id = results[0].ID_user;
                const token = jwt.sign({id:id}, process.env.JWT_SECRETO, {
                    expiresIn: process.env.JWT_EXP
                });
                const cookieConfig={
                    expires: new Date(Date.now()+process.env.JWT_COOKIE_EXP * 24 * 60 * 1000),
                    httpOnly: true
                };
                res.cookie('jwt', token, cookieConfig)
                res.redirect('/');
            }
        })
    }
}

exports.authentication = async (req, res, next)=>{
    if(req.cookies.jwt){
        try {
            const deco = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRETO)
            conexion.query('SELECT * FROM usuario WHERE ID_use = ?', [deco.id], (error, results)=>{
                if(!results){return next()}
                req.NAME_user = results[0]
                return next()
            })
        } catch (error) {
            console.log(error)
            return next()
        }
    }else{
        res.redirect('/login')
    }
}

exports.logOut = async(req, res)=>{
    res.clearCookie('jwt')
    return res.redirect('/')
}