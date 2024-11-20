const mysql = require('../config/conexion');

exports.save = (req, res) =>{
    const user = req.body.user;
    const password = req.body.password;
    const con = mysql.query('SELECT ID_deb FROM usuario WHERE NAME_user =' + mysql.escape(user) +'AND CONT_USER ='+ mysql.escape(password))
}