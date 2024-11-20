let sql = require("mysql");

let conexion = sql.createConnection({
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

conexion.connect(function(error){
        if(error){
            throw error;
        }else{
            console.log("conectado papu");
        }
});

module.exports = conexion;

