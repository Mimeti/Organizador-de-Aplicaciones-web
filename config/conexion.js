let sql = require("mysql");

let conexion = sql.createConnection({
    host: "localhost",
    database: "bd_organizador",
    user: "root",
    password: ""
});

conexion.connect(function(error){
        if(error){
            throw error;
        }else{
            console.log("conectado papu");
        }
});

export{conexion};

